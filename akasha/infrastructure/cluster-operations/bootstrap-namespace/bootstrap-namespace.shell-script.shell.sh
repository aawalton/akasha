#!/usr/bin/env bash

set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"

_DEPLOY_LIB_DIR="${AKASHA_ROOT}/akasha/infrastructure/cluster-operations/deploy-functions"
# shellcheck source=../deploy-functions/deploy-functions.shell-script.shell.sh disable=SC1091
. "${_DEPLOY_LIB_DIR}/deploy-functions.shell-script.shell.sh"

if [[ $# -lt 1 ]]; then
  echo "Usage: $(basename "$0") <workspace>"
  echo ""
  echo "Bootstrap a new workspace namespace with K8s manifests, secrets,"
  echo "and CI pipeline RBAC."
  echo ""
  echo "Examples:"
  echo "  $(basename "$0") temper"
  echo "  $(basename "$0") alanwalton"
  echo "  $(basename "$0") collections"
  exit 1
fi

WORKSPACE="$1"
resolve_workspace_dir() {
  local ws="$1"
  case "$ws" in
    cluster) echo "${AKASHA_ROOT}/infra" ;;
    design-system) echo "${AKASHA_ROOT}/akasha/design/design-system" ;;
    *) echo "${AKASHA_ROOT}/$ws" ;;
  esac
}
WORKSPACE_DIR="$(resolve_workspace_dir "$WORKSPACE")"

NAMESPACE="$WORKSPACE"
REPO_ROOT="${AKASHA_ROOT}"

resolve_secrets_sops() {
  local ws="$1"
  local workspace_dir="$2"
  case "$ws" in
    collections) echo "${workspace_dir}/deploy/k8s/secrets.sops.yaml" ;;
    agents)      echo "${REPO_ROOT}/packages/agents/k8s/secrets.sops.yaml" ;;
    *)           echo "${workspace_dir}/deploy/secrets.sops.yaml" ;;
  esac
}

if [[ ! -d "$WORKSPACE_DIR" ]]; then
  die "Workspace directory not found: $WORKSPACE_DIR"
fi

log "Bootstrapping namespace '$NAMESPACE' for workspace '$WORKSPACE'"
echo ""

log "Step 1: Creating namespace '$NAMESPACE' (if it doesn't exist)"
kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -
kubectl label namespace "$NAMESPACE" --overwrite \
  "kubernetes.io/metadata.name=$NAMESPACE"
ok "Namespace '$NAMESPACE' ready"

K8S_DIR="${WORKSPACE_DIR}/deploy/k8s"
if [[ -d "$K8S_DIR" ]]; then
  log "Step 2: Applying K8s manifests from $K8S_DIR"
  apply_manifests "$K8S_DIR" "$NAMESPACE"
  ok "K8s manifests applied"
else
  warn "Step 2: No K8s manifest directory found at $K8S_DIR — skipping"
fi

SECRETS_SOPS="$(resolve_secrets_sops "$WORKSPACE" "$WORKSPACE_DIR")"
SECRETS_TMPL="${WORKSPACE_DIR}/deploy/secrets.tmpl.yaml"
ENV_FILE="${WORKSPACE_DIR}/.env.production"

if [[ -f "$SECRETS_SOPS" ]]; then
  log "Step 3: Applying secrets via SOPS ($SECRETS_SOPS)"
  apply_sops_secret "$SECRETS_SOPS" "$NAMESPACE"
  ok "Secrets applied (SOPS)"
elif [[ -f "$SECRETS_TMPL" ]]; then
  log "Step 3: Applying secrets via envsubst template ($SECRETS_TMPL)"

  if [[ -f "$ENV_FILE" ]]; then
    log "Found .env.production — loading values from $ENV_FILE"
    load_env "$ENV_FILE"
  else
    log "No .env.production found — prompting for secret values"
    echo ""

    VARS="$(grep -oP '\$\{(\w+)\}' "$SECRETS_TMPL" | sed 's/\${\(.*\)}/\1/' | sort -u)"

    for var in $VARS; do
      if [[ -n "${!var:-}" ]]; then
        log "  $var: already set in environment"
        continue
      fi

      read -rp "  Enter value for $var: " value
      export "$var=$value"
    done
    echo ""
  fi

  apply_secrets "$SECRETS_TMPL" "$NAMESPACE"
  ok "Secrets applied (envsubst)"
else
  warn "Step 3: No secrets file found (checked $SECRETS_SOPS and $SECRETS_TMPL) — skipping"
fi

log "Step 4: Applying CI pipeline RBAC for namespace '$NAMESPACE'"

akasha cluster-rbac-manifest | kubectl apply -f -
ok "CI pipeline RBAC applied for '$NAMESPACE'"

echo ""
ok "================================================================"
ok "  Namespace '${NAMESPACE}' bootstrapped for workspace '${WORKSPACE}'!"
ok "================================================================"
echo ""
log "Next steps:"
echo "  1. Verify manifests:  kubectl get all -n ${NAMESPACE}"
echo "  2. Add tunnel route:  add a tunnel-routes.ts fragment in the package directory (discovered repo-wide); the cloudflared workflow regenerates the ConfigMap and reconciles DNS"
