#!/usr/bin/env bash

set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"

_DEPLOY_LIB_DIR="${AKASHA_ROOT}/infrastructure/cluster-operations/deploy-functions"
# shellcheck source=../deploy-functions/deploy-functions.shell-script.shell.sh disable=SC1091
. "${_DEPLOY_LIB_DIR}/deploy-functions.shell-script.shell.sh"

NODES_FILE="${AKASHA_ROOT}/infrastructure/cluster-operations/nodes.json"
[[ -f "$NODES_FILE" ]] || die "nodes.json not found: $NODES_FILE"

KEY_PATH="${HOME}/.ssh/claude_mcp_key"

usage() {
  echo "Usage: $(basename "$0") <subcommand>"
  echo ""
  echo "Subcommands:"
  echo "  generate [--force]  Create new ed25519 keypair (skip if exists unless --force)"
  echo "  distribute          Add current public key to all nodes' authorized_keys"
  echo "  rotate              Full rotation: backup old key, generate new, distribute, verify, cleanup"
  echo "  status              Test SSH connectivity to all nodes"
  exit 1
}

for_each_node() {
  local callback="$1"
  local ssh_key_override="${2:-}"
  local node_ids
  mapfile -t node_ids < <(jq -r '.[].id' "$NODES_FILE")

  for node_id in "${node_ids[@]}"; do
    local host user key
    host="$(node_field "$node_id" host)"
    user="$(node_field "$node_id" user)"
    key="${ssh_key_override:-$(node_field "$node_id" keyPath)}"
    "$callback" "$node_id" "$host" "$user" "$key"
  done
}

cmd_generate() {
  local force=false
  [[ "${1:-}" == "--force" ]] && force=true

  if [[ -f "$KEY_PATH" ]] && [[ "$force" != "true" ]]; then
    log "SSH key already exists at $KEY_PATH (use --force to overwrite)"
    return 0
  fi

  log "Generating new ed25519 keypair at $KEY_PATH"
  ssh-keygen -t ed25519 -f "$KEY_PATH" -N "" -C "claude_mcp_key@cluster"
  ok "Keypair generated: $KEY_PATH"
}

cmd_distribute() {
  [[ -f "${KEY_PATH}.pub" ]] || die "Public key not found: ${KEY_PATH}.pub"

  local pub_key
  pub_key="$(cat "${KEY_PATH}.pub")"
  log "Distributing public key to all nodes..."

  distribute_to_node() {
    local node_id="$1" host="$2" user="$3" key="$4"
    log "  $node_id ($host)..."
    ssh -i "$key" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 "${user}@${host}" \
      "grep -qF '${pub_key}' ~/.ssh/authorized_keys 2>/dev/null || echo '${pub_key}' >> ~/.ssh/authorized_keys"
    ok "  $node_id: key distributed"
  }

  for_each_node distribute_to_node
  ok "Public key distributed to all nodes"
}

cmd_rotate() {
  [[ -f "$KEY_PATH" ]] || die "No existing key at $KEY_PATH — run 'generate' first"

  local old_key_path="${KEY_PATH}.old"
  local old_pub_key
  old_pub_key="$(cat "${KEY_PATH}.pub")"

  log "Backing up old key to ${old_key_path}"
  cp "$KEY_PATH" "$old_key_path"
  cp "${KEY_PATH}.pub" "${old_key_path}.pub"
  ok "Old key backed up"

  log "Generating new keypair..."
  rm -f "$KEY_PATH" "${KEY_PATH}.pub"
  ssh-keygen -t ed25519 -f "$KEY_PATH" -N "" -C "claude_mcp_key@cluster" -q
  ok "New keypair generated"

  local new_pub_key
  new_pub_key="$(cat "${KEY_PATH}.pub")"

  log "Distributing new public key using old key for access..."

  distribute_new_key() {
    local node_id="$1" host="$2" user="$3" _key="$4"
    log "  $node_id ($host)..."
    ssh -i "$old_key_path" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 "${user}@${host}" \
      "grep -qF '${new_pub_key}' ~/.ssh/authorized_keys 2>/dev/null || echo '${new_pub_key}' >> ~/.ssh/authorized_keys"
    ok "  $node_id: new key added"
  }

  for_each_node distribute_new_key
  ok "New public key distributed to all nodes"

  log "Verifying connectivity with new key..."
  local all_verified=true

  verify_new_key() {
    local node_id="$1" host="$2" user="$3" _key="$4"
    if ssh -i "$KEY_PATH" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 -o BatchMode=yes \
      "${user}@${host}" "echo ok" &>/dev/null; then
      ok "  $node_id: verified"
    else
      warn "  $node_id ($host): FAILED to connect with new key"
      all_verified=false
    fi
  }

  for_each_node verify_new_key

  if [[ "$all_verified" != "true" ]]; then
    warn "Some nodes failed verification — aborting old key cleanup"
    warn "Old key preserved at $old_key_path"
    warn "New key is at $KEY_PATH — both keys are authorized on successful nodes"
    die "Rotation incomplete: fix failed nodes, then manually remove old key"
  fi

  log "All nodes verified — removing old public key from authorized_keys..."

  remove_old_key() {
    local node_id="$1" host="$2" user="$3" _key="$4"
    log "  $node_id ($host)..."
    ssh -i "$KEY_PATH" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 "${user}@${host}" \
      "grep -vF '${old_pub_key}' ~/.ssh/authorized_keys > ~/.ssh/authorized_keys.tmp && mv ~/.ssh/authorized_keys.tmp ~/.ssh/authorized_keys"
    ok "  $node_id: old key removed"
  }

  for_each_node remove_old_key

  rm -f "$old_key_path" "${old_key_path}.pub"
  ok "SSH key rotation complete"
}

cmd_status() {
  echo ""
  log "=== SSH Key Status ==="
  echo ""

  if [[ -f "$KEY_PATH" ]]; then
    ok "Key exists: $KEY_PATH"
  else
    warn "No key at $KEY_PATH"
  fi

  log "Testing SSH connectivity to all nodes..."
  echo ""

  check_node() {
    local node_id="$1" host="$2" user="$3" key="$4"
    if ssh -i "$key" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=5 -o BatchMode=yes \
      "${user}@${host}" "echo ok" &>/dev/null; then
      ok "  $node_id ($host): connected"
    else
      warn "  $node_id ($host): FAILED"
    fi
  }

  for_each_node check_node
  echo ""
}

case "${1:-}" in
  generate)    shift; cmd_generate "$@" ;;
  distribute)  cmd_distribute ;;
  rotate)      cmd_rotate ;;
  status)      cmd_status ;;
  *)           usage ;;
esac
