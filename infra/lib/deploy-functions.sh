#!/bin/bash
# shellcheck disable=SC2016  # single-quoted ${VAR} strings are envsubst templates, not missed expansions

set -euo pipefail

[ -n "${_DEPLOY_LIB_DIR:-}" ] || { echo 'ERROR: _DEPLOY_LIB_DIR must be set before sourcing deploy-functions.sh' >&2; exit 1; }
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

node_field() {
  local node_id="$1"
  local field="$2"
  local nodes_file
  nodes_file="$(cd "${_DEPLOY_LIB_DIR}/../.." && pwd)/akasha/infrastructure/cluster-operations/nodes.json"
  local val
  val="$(jq -r --arg id "$node_id" --arg f "$field" '.[] | select(.id==$id) | .[$f]' "$nodes_file")"
  { [ -n "$val" ] && [ "$val" != "null" ]; } || die "nodes.json: no '$field' for node '$node_id'"
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

load_env() {
  local file="${1:?Usage: load_env <file>}"
  if [ ! -f "$file" ]; then
    die "Env file not found: $file"
  fi
  log "Loading env from $file"
  set -a
  # shellcheck disable=SC1090
  . "$file"
  set +a
}

apply_secrets() {
  local tmpl="${1:?Usage: apply_secrets <tmpl> <ns>}"
  local ns="${2:?Usage: apply_secrets <tmpl> <ns>}"
  if [ ! -f "$tmpl" ]; then
    die "Template file not found: $tmpl"
  fi
  check_rbac "$ns" "create" "secrets"
  check_rbac "$ns" "patch" "secrets"
  log "Applying secrets from $tmpl into namespace $ns"
  if [ "${DEPLOY_DRY_RUN:-}" = "diff" ]; then
    local rc=0
    envsubst < "$tmpl" | kubectl diff -n "$ns" -f - > /dev/null 2>&1 || rc=$?
    if [ "$rc" -gt 1 ]; then die "kubectl diff failed (exit $rc)"; fi
    return 0
  fi
  envsubst < "$tmpl" | kubectl apply -n "$ns" -f -
}

apply_sops_secret() {
  local file="${1:?Usage: apply_sops_secret <file> <ns>}"
  local ns="${2:?Usage: apply_sops_secret <file> <ns>}"
  if [ ! -f "$file" ]; then
    die "SOPS secret file not found: $file"
  fi
  if ! command -v sops >/dev/null 2>&1; then
    die "sops not found — install with: brew install sops or download from https://github.com/getsops/sops/releases"
  fi
  check_rbac "$ns" "create" "secrets"
  check_rbac "$ns" "patch" "secrets"
  log "Applying SOPS secret from $file into namespace $ns"
  if [ "${DEPLOY_DRY_RUN:-}" = "diff" ]; then
    local rc=0
    sops -d "$file" | kubectl diff -n "$ns" -f - > /dev/null 2>&1 || rc=$?
    if [ "$rc" -gt 1 ]; then die "kubectl diff failed (exit $rc)"; fi
    return 0
  fi
  sops -d "$file" | kubectl apply -n "$ns" -f -
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

apply_pg_backup() {
  local name="${1:?Usage: apply_pg_backup <name> <ns> <secret> [schedule] [retention] [storage]}"
  local ns="${2:?Usage: apply_pg_backup <name> <ns> <secret> [schedule] [retention] [storage]}"
  local secret="${3:?Usage: apply_pg_backup <name> <ns> <secret> [schedule] [retention] [storage]}"
  local schedule="${4:-0 3 * * *}"
  local retention="${5:-7}"
  local storage="${6:-5Gi}"

  local tmpl_dir
  tmpl_dir="$(cd "${_DEPLOY_LIB_DIR}/../k8s/templates" && pwd)"

  for f in pg-backup-pv.yaml pg-backup-pvc.yaml pg-backup-cronjob.yaml; do
    [ -f "$tmpl_dir/$f" ] || die "Template not found: $tmpl_dir/$f"
  done

  local node01_user node01_host ssh_key
  node01_user="$(node_field node-01 user)"
  node01_host="$(node_field node-01 host)"
  ssh_key="$(node_field node-01 keyPath)"
  local backup_dir="/mnt/bulk/backups/${name}"

  log "Ensuring backup directory ${backup_dir} on node-01"
  ssh -i "$ssh_key" -o StrictHostKeyChecking=accept-new "${node01_user}@${node01_host}" \
    "mkdir -p '${backup_dir}' && sudo chown 1000:1000 '${backup_dir}'"

  local envvars_pv='${BACKUP_NAME} ${BACKUP_NAMESPACE} ${BACKUP_STORAGE_SIZE}'
  local envvars_pvc='${BACKUP_NAME} ${BACKUP_NAMESPACE} ${BACKUP_STORAGE_SIZE}'
  local envvars_cron='${BACKUP_NAME} ${BACKUP_NAMESPACE} ${BACKUP_SECRET_NAME} ${BACKUP_SCHEDULE} ${BACKUP_RETENTION_DAYS}'

  log "Applying PV ${name}-pg-backup"
  BACKUP_NAME="$name" \
  BACKUP_NAMESPACE="$ns" \
  BACKUP_STORAGE_SIZE="$storage" \
    envsubst "$envvars_pv" < "$tmpl_dir/pg-backup-pv.yaml" \
    | kubectl apply -f -

  log "Applying PVC ${name}-pg-backup in ${ns}"
  BACKUP_NAME="$name" \
  BACKUP_NAMESPACE="$ns" \
  BACKUP_STORAGE_SIZE="$storage" \
    envsubst "$envvars_pvc" < "$tmpl_dir/pg-backup-pvc.yaml" \
    | kubectl apply -n "$ns" -f -

  log "Applying CronJob ${name}-pg-backup in ${ns}"
  BACKUP_NAME="$name" \
  BACKUP_NAMESPACE="$ns" \
  BACKUP_SECRET_NAME="$secret" \
  BACKUP_SCHEDULE="$schedule" \
  BACKUP_RETENTION_DAYS="$retention" \
    envsubst "$envvars_cron" < "$tmpl_dir/pg-backup-cronjob.yaml" \
    | kubectl apply -n "$ns" -f -

  ok "Backup resources applied for ${name} in ${ns} → node-01:${backup_dir}"
}

apply_pg_basebackup() {
  local name="${1:?Usage: apply_pg_basebackup <name> <ns> <secret> [schedule] [retention_count]}"
  local ns="${2:?Usage: apply_pg_basebackup <name> <ns> <secret> [schedule] [retention_count]}"
  local secret="${3:?Usage: apply_pg_basebackup <name> <ns> <secret> [schedule] [retention_count]}"
  local schedule="${4:-0 */12 * * *}"
  local retention_count="${5:-3}"

  local tmpl_dir
  tmpl_dir="$(cd "${_DEPLOY_LIB_DIR}/../k8s/templates" && pwd)"

  local tmpl="$tmpl_dir/pg-basebackup-cronjob.yaml"
  [ -f "$tmpl" ] || die "Template not found: $tmpl"

  local envvars='${BACKUP_NAME} ${BACKUP_NAMESPACE} ${BACKUP_SECRET_NAME} ${BASEBACKUP_SCHEDULE} ${BASEBACKUP_RETENTION_COUNT}'

  log "Applying CronJob ${name}-pg-basebackup in ${ns}"
  BACKUP_NAME="$name" \
  BACKUP_NAMESPACE="$ns" \
  BACKUP_SECRET_NAME="$secret" \
  BASEBACKUP_SCHEDULE="$schedule" \
  BASEBACKUP_RETENTION_COUNT="$retention_count" \
    envsubst "$envvars" < "$tmpl" \
    | kubectl apply -n "$ns" -f -

  ok "Base backup CronJob applied for ${name} in ${ns} (schedule: ${schedule}, keep ${retention_count})"
}

apply_wal_sync() {
  local name="${1:?Usage: apply_wal_sync <name> <ns> [schedule] [storage]}"
  local ns="${2:?Usage: apply_wal_sync <name> <ns> [schedule] [storage]}"
  local schedule="${3:-*/30 * * * *}"
  local storage="${4:-10Gi}"

  local tmpl_dir
  tmpl_dir="$(cd "${_DEPLOY_LIB_DIR}/../k8s/templates" && pwd)"

  for f in wal-sync-pv.yaml wal-sync-pvc.yaml wal-sync-cronjob.yaml; do
    [ -f "$tmpl_dir/$f" ] || die "Template not found: $tmpl_dir/$f"
  done

  local node01_user node01_host ssh_key
  node01_user="$(node_field node-01 user)"
  node01_host="$(node_field node-01 host)"
  ssh_key="$(node_field node-01 keyPath)"
  local wal_dir="/mnt/bulk/wal-archive/${name}"

  log "Ensuring WAL archive directory ${wal_dir} on node-01"
  ssh -i "$ssh_key" -o StrictHostKeyChecking=accept-new "${node01_user}@${node01_host}" \
    "mkdir -p '${wal_dir}' && sudo chown 1000:1000 '${wal_dir}'"

  local envvars_pv='${WAL_SYNC_NAME} ${WAL_SYNC_NAMESPACE} ${WAL_SYNC_STORAGE_SIZE}'
  local envvars_pvc='${WAL_SYNC_NAME} ${WAL_SYNC_NAMESPACE} ${WAL_SYNC_STORAGE_SIZE}'
  local envvars_cron='${WAL_SYNC_NAME} ${WAL_SYNC_NAMESPACE} ${WAL_SYNC_SCHEDULE}'

  log "Applying PV ${name}-wal-sync"
  WAL_SYNC_NAME="$name" \
  WAL_SYNC_NAMESPACE="$ns" \
  WAL_SYNC_STORAGE_SIZE="$storage" \
    envsubst "$envvars_pv" < "$tmpl_dir/wal-sync-pv.yaml" \
    | kubectl apply -f -

  log "Applying PVC ${name}-wal-sync in ${ns}"
  WAL_SYNC_NAME="$name" \
  WAL_SYNC_NAMESPACE="$ns" \
  WAL_SYNC_STORAGE_SIZE="$storage" \
    envsubst "$envvars_pvc" < "$tmpl_dir/wal-sync-pvc.yaml" \
    | kubectl apply -n "$ns" -f -

  log "Applying RBAC + CronJob ${name}-wal-sync in ${ns}"
  WAL_SYNC_NAME="$name" \
  WAL_SYNC_NAMESPACE="$ns" \
  WAL_SYNC_SCHEDULE="$schedule" \
    envsubst "$envvars_cron" < "$tmpl_dir/wal-sync-cronjob.yaml" \
    | kubectl apply -n "$ns" -f -

  ok "WAL sync resources applied for ${name} in ${ns} → node-01:${wal_dir}"
}

# shellcheck source=infra/lib/deploy-dns-functions.sh
. "$_DEPLOY_LIB_DIR/deploy-dns-functions.sh"
