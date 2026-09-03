#!/usr/bin/env bash

set -euo pipefail

AKASHA_ROOT="${AKASHA_ROOT:-$HOME/repos/akasha}"
REPO_ROOT="${AKASHA_ROOT}"

_DEPLOY_LIB_DIR="${AKASHA_ROOT}/akasha/infrastructure/cluster-operations/deploy-functions"
# shellcheck source=../deploy-functions/deploy-functions.shell-script.shell.sh disable=SC1091
. "${_DEPLOY_LIB_DIR}/deploy-functions.shell-script.shell.sh"

AGE_KEYS_DIR="${HOME}/.config/sops/age"
AGE_KEYS_FILE="${AGE_KEYS_DIR}/keys.txt"

usage() {
  echo "Usage: $(basename "$0") <subcommand>"
  echo ""
  echo "Subcommands:"
  echo "  generate [--force]  Create a new age keypair (skip if exists unless --force)"
  echo "  rotate              Full rotation: new key, re-encrypt all SOPS files"
  echo "  status              Show current key info and verify configuration"
  exit 1
}

cmd_generate() {
  local force=false
  [[ "${1:-}" == "--force" ]] && force=true

  if [[ -f "$AGE_KEYS_FILE" ]] && [[ "$force" != "true" ]]; then
    log "Age key already exists at $AGE_KEYS_FILE (use --force to overwrite)"
    return 0
  fi

  mkdir -p "$AGE_KEYS_DIR"
  log "Generating new age keypair..."
  age-keygen -o "$AGE_KEYS_FILE" 2>&1
  chmod 600 "$AGE_KEYS_FILE"
  ok "Age keypair written to $AGE_KEYS_FILE"
}

cmd_rotate() {
  command -v age-keygen &>/dev/null || die "age-keygen not found — install age first"
  command -v sops &>/dev/null || die "sops not found — install sops first"

  local old_public_key=""
  if [[ -f "${REPO_ROOT}/.sops.yaml" ]]; then
    old_public_key="$(grep -oP 'age: "\K[^"]+' "${REPO_ROOT}/.sops.yaml" || grep -oP 'age:\s*\K\S+' "${REPO_ROOT}/.sops.yaml")" ||
      die "Could not read an age public key from ${REPO_ROOT}/.sops.yaml — refusing to rotate against no old key"
    [[ -n "$old_public_key" ]] ||
      die "Age public key in ${REPO_ROOT}/.sops.yaml is empty — refusing to rotate against no old key"
  fi
  log "Old public key: ${old_public_key:-<none>}"

  local new_keys
  new_keys="$(age-keygen 2>&1)"
  local new_public_key
  new_public_key="$(echo "$new_keys" | grep -oP 'age1\S+')"
  local new_private_key
  new_private_key="$(echo "$new_keys" | grep '^AGE-SECRET-KEY-')"

  [[ -n "$new_public_key" ]] || die "Failed to extract public key from age-keygen output"
  [[ -n "$new_private_key" ]] || die "Failed to extract private key from age-keygen output"
  ok "Generated new keypair (public: ${new_public_key})"

  mkdir -p "$AGE_KEYS_DIR"
  if [[ -f "$AGE_KEYS_FILE" ]]; then
    log "Appending new private key to $AGE_KEYS_FILE (keeping old key for re-encryption)"
    {
      echo ""
      echo "# rotated $(date -u +%Y-%m-%dT%H:%M:%SZ)"
      echo "$new_private_key"
    } >> "$AGE_KEYS_FILE"
  else
    {
      echo "# created $(date -u +%Y-%m-%dT%H:%M:%SZ)"
      echo "$new_private_key"
    } > "$AGE_KEYS_FILE"
  fi
  chmod 600 "$AGE_KEYS_FILE"
  ok "Private key appended to $AGE_KEYS_FILE"

  local root_sops="${REPO_ROOT}/.sops.yaml"

  # shellcheck disable=SC2066  # Intentional: one quoted config, the loop runs once
  for sops_config in "$root_sops"; do
    if [[ -f "$sops_config" ]]; then
      log "Updating $sops_config with new public key"
      sed -i "s|age: \"[^\"]*\"|age: \"${new_public_key}\"|" "$sops_config"
      ok "Updated $sops_config"
    else
      warn "SOPS config not found: $sops_config"
    fi
  done

  log "Re-keying all SOPS-encrypted files..."
  local sops_files
  sops_files="$(find "$REPO_ROOT" -name "*.sops.yaml" ! -path "*/.sops.yaml" ! -path "*node_modules*")"

  local failed=0
  while IFS= read -r sops_file; do
    [[ -z "$sops_file" ]] && continue
    local basename
    basename="$(basename "$sops_file")"
    [[ "$basename" == ".sops.yaml" ]] && continue

    log "  Updating keys: $sops_file"
    if ! sops updatekeys -y "$sops_file"; then
      warn "  Failed to update keys for $sops_file"
      failed=$((failed + 1))
    fi
  done <<< "$sops_files"

  if [[ "$failed" -gt 0 ]]; then
    die "$failed files failed to re-key — old private key preserved in $AGE_KEYS_FILE (both keys present). Fix failures and re-run."
  fi
  ok "All SOPS files re-keyed successfully"

  log "Removing old private key from $AGE_KEYS_FILE"
  local temp_keys
  temp_keys="$(mktemp)"
  chmod 600 "$temp_keys"
  # shellcheck disable=SC2064  # Intentional: capture $temp_keys at definition time
  trap "rm -f '$temp_keys'" EXIT
  echo "# rotated $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$temp_keys"
  echo "$new_private_key" >> "$temp_keys"
  mv "$temp_keys" "$AGE_KEYS_FILE"
  trap - EXIT
  ok "Old private key removed from $AGE_KEYS_FILE"

  ok "Age key rotation complete (new public key: ${new_public_key})"
}

cmd_status() {
  echo ""
  log "=== Age Key Status ==="
  echo ""

  local root_sops="${REPO_ROOT}/.sops.yaml"
  if [[ -f "$root_sops" ]]; then
    local public_key
    public_key="$(grep -oP 'age:\s*"?\K[^"]+' "$root_sops" | head -1 || true)"
    log "Public key (.sops.yaml): ${public_key:-<not found>}"
  else
    warn "Root .sops.yaml not found"
  fi

  if [[ -f "$AGE_KEYS_FILE" ]]; then
    local key_count
    key_count="$(grep -c '^AGE-SECRET-KEY-' "$AGE_KEYS_FILE" || echo 0)"
    ok "Local private key exists ($AGE_KEYS_FILE, $key_count key(s))"
  else
    warn "No local private key at $AGE_KEYS_FILE"
  fi

  echo ""
}

case "${1:-}" in
  generate) shift; cmd_generate "$@" ;;
  rotate)   cmd_rotate ;;
  status)   cmd_status ;;
  *)        usage ;;
esac
