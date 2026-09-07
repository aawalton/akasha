#!/bin/bash
# shellcheck disable=SC2016  # single-quoted ${VAR} strings are envsubst templates, not missed expansions

set -euo pipefail

[ -n "${_DEPLOY_LIB_DIR:-}" ] || { echo 'ERROR: _DEPLOY_LIB_DIR must be set before sourcing deploy-functions.shell-script.shell.sh' >&2; exit 1; }
_DEPLOY_LIB_DIR="$(cd "$_DEPLOY_LIB_DIR" && pwd)"

_red()    { printf '\033[0;31m%s\033[0m\n' "$*"; }
_green()  { printf '\033[0;32m%s\033[0m\n' "$*"; }
_yellow() { printf '\033[0;33m%s\033[0m\n' "$*"; }
_blue()   { printf '\033[0;34m%s\033[0m\n' "$*"; }

log()   { _blue  "[deploy] $*"; }
ok()    { _green "[deploy] $*"; }
warn()  { _yellow "[deploy] WARNING: $*"; }
err()   { _red   "[deploy] ERROR: $*" >&2; }
die()   { err "$@"; exit 1; }

_cluster_nodes_table=""

_cluster_nodes_load() {
  if [ -n "$_cluster_nodes_table" ]; then return 0; fi
  local root
  root="$(cd "${_DEPLOY_LIB_DIR}/../../.." && pwd)"
  _cluster_nodes_table="$(bun "${root}/machines/hosts/cluster-nodes/cluster-nodes.module.code.ts")" \
    || die "cluster-nodes did not answer"
  [ -n "$_cluster_nodes_table" ] || die "cluster-nodes answered nothing"
}

node_ids() {
  _cluster_nodes_load
  printf '%s\n' "$_cluster_nodes_table" | cut -f1
}

node_field() {
  local node_id="$1"
  local field="$2"
  local col
  case "$field" in
    address) col=2 ;;
    user)    col=3 ;;
    *)       die "cluster-nodes: no field '$field'" ;;
  esac
  _cluster_nodes_load
  local val
  val="$(printf '%s\n' "$_cluster_nodes_table" | awk -F'\t' -v id="$node_id" -v c="$col" '$1 == id { print $c }')"
  [ -n "$val" ] || die "cluster-nodes: no '$field' for node '$node_id'"
  echo "$val"
}

check_rbac() {
  local ns="$1"
  local verb="$2"
  local resource="$3"
  local api_group="${4:-}"
  local target="$resource"
  [ -n "$api_group" ] && target="${resource}.${api_group}"
  if ! kubectl auth can-i "$verb" "$target" -n "$ns" --quiet 2>/dev/null; then
    warn "RBAC: cannot '$verb' $target in namespace '$ns' — update generate-rbac.ts"
  fi
}

apply_manifests() {
  local dir="${1:?Usage: apply_manifests <dir> <ns>}"
  local ns="${2:?Usage: apply_manifests <dir> <ns>}"
  if [ ! -d "$dir" ]; then
    die "Manifest directory not found: $dir"
  fi
  check_rbac "$ns" "create" "deployments" "apps"
  check_rbac "$ns" "patch" "deployments" "apps"
  log "Applying manifests from $dir into namespace $ns"
  if [ "${DEPLOY_DRY_RUN:-}" = "diff" ]; then
    local rc=0
    kubectl diff -n "$ns" -R -f "$dir/" || rc=$?
    if [ "$rc" -gt 1 ]; then die "kubectl diff failed (exit $rc)"; fi
    return 0
  fi
  kubectl apply -n "$ns" -R -f "$dir/"
}

build_and_push() {
  local context="${1:?Usage: build_and_push <context> <image> <sha> <dockerfile> [--latest]}"
  local image="${2:?Usage: build_and_push <context> <image> <sha> <dockerfile> [--latest]}"
  local sha="${3:?Usage: build_and_push <context> <image> <sha> <dockerfile> [--latest]}"
  local dockerfile="${4:?Usage: build_and_push <context> <image> <sha> <dockerfile> [--latest]}"
  local push_latest="${5:-}"
  local tag="${image}:${sha}"

  if [ ! -f "$dockerfile" ]; then
    die "Dockerfile not found: $dockerfile"
  fi

  if [ -n "${DEPLOY_DRY_RUN:-}" ]; then
    log "Skipping build_and_push (dry run)"
    return 0
  fi

  log "Building $tag from $dockerfile (context: $context)"
  docker build -t "$tag" -f "$dockerfile" "$context"

  log "Pushing $tag"
  docker push "$tag"

  if [ "$push_latest" = "--latest" ]; then
    docker tag "$tag" "${image}:latest"
    log "Pushing ${image}:latest"
    docker push "${image}:latest"
    ok "Pushed $tag + ${image}:latest"
  else
    ok "Pushed $tag"
  fi
}

rollout_image() {
  local ns="${1:?Usage: rollout_image <ns> <resource> <image>}"
  local resource="${2:?Usage: rollout_image <ns> <resource> <image>}"
  local image="${3:?Usage: rollout_image <ns> <resource> <image>}"

  local container_name="${resource#*/}"
  local kind="${resource%%/*}"
  check_rbac "$ns" "patch" "$kind" "apps"

  if [ -n "${DEPLOY_DRY_RUN:-}" ]; then
    log "Skipping rollout_image (dry run)"
    return 0
  fi

  log "Setting image for $resource in $ns → $image (container: $container_name)"
  kubectl set image -n "$ns" "$resource" "$container_name=$image"
}

verify_rollout() {
  local ns="${1:?Usage: verify_rollout <ns> <resource> [timeout]}"
  local resource="${2:?Usage: verify_rollout <ns> <resource> [timeout]}"
  local timeout="${3:-120s}"
  local kind="${resource%%/*}"
  check_rbac "$ns" "get" "$kind" "apps"

  if [ -n "${DEPLOY_DRY_RUN:-}" ]; then
    log "Skipping verify_rollout (dry run)"
    return 0
  fi

  log "Waiting for rollout of $resource in $ns (timeout: $timeout)"
  if kubectl rollout status -n "$ns" "$resource" --timeout="$timeout"; then
    ok "Rollout of $resource in $ns completed successfully"
  else
    die "Rollout of $resource in $ns failed or timed out"
  fi
}

wait_for_postgres() {
  local ns="${1:?Usage: wait_for_postgres <ns> <svc> [timeout]}"
  local svc="${2:?Usage: wait_for_postgres <ns> <svc> [timeout]}"
  local timeout="${3:-120}"
  local interval=5
  local elapsed=0

  log "Waiting for Postgres at $svc.$ns (timeout: ${timeout}s)"

  local pod=""
  while [ "$elapsed" -lt "$timeout" ]; do
    pod="$(kubectl get pods -n "$ns" -l app=postgres -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || true)"
    if [ -n "$pod" ]; then
      break
    fi
    sleep "$interval"
    elapsed=$(( elapsed + interval ))
  done

  if [ -z "$pod" ]; then
    die "No postgres pod found in $ns after ${timeout}s"
  fi

  while [ "$elapsed" -lt "$timeout" ]; do
    if kubectl exec -n "$ns" "$pod" -- pg_isready -U postgres -q 2>/dev/null; then
      ok "Postgres at $svc.$ns is ready"
      return 0
    fi
    sleep "$interval"
    elapsed=$(( elapsed + interval ))
  done

  die "Postgres at $svc.$ns not ready after ${timeout}s"
}

# shellcheck source=../deploy-dns-functions/deploy-dns-functions.shell-script.shell.sh
. "$_DEPLOY_LIB_DIR/../deploy-dns-functions/deploy-dns-functions.shell-script.shell.sh"
