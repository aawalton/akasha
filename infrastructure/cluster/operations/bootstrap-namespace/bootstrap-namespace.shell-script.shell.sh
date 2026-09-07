#!/usr/bin/env bash

set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"

_DEPLOY_LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../deploy-functions" && pwd)"
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
    design-system) echo "${AKASHA_ROOT}/design/design-system" ;;
    *) echo "${AKASHA_ROOT}/$ws" ;;
  esac
}
WORKSPACE_DIR="$(resolve_workspace_dir "$WORKSPACE")"

NAMESPACE="$WORKSPACE"
SECRET_RESOURCE="${WORKSPACE}-secrets"
SECRET_SAYING="${AKASHA_ROOT}/service-system/secrets/secret-saying/secret-saying.module.code.ts"

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

log "Step 3: Applying the secrets the pages place in $SECRET_RESOURCE"
check_rbac "$NAMESPACE" "create" "secrets"
check_rbac "$NAMESPACE" "patch" "secrets"

if SAID="$(bun "$SECRET_SAYING" --root "$AKASHA_ROOT" --resource "$SECRET_RESOURCE" --namespace "$NAMESPACE")"; then
  if [[ "${DEPLOY_DRY_RUN:-}" == "diff" ]]; then
    rc=0
    printf '%s' "$SAID" | kubectl diff -f - > /dev/null 2>&1 || rc=$?
    if [[ "$rc" -gt 1 ]]; then die "kubectl diff failed (exit $rc)"; fi
  else
    printf '%s' "$SAID" | kubectl apply -f -
  fi
  unset SAID
  ok "Secrets applied from the pages placing values in $SECRET_RESOURCE"
else
  warn "Step 3: no secret page places a value in $SECRET_RESOURCE — skipping"
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
