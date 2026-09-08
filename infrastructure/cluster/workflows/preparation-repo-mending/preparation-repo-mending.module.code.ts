const PREP_SELFHEAL_LOG_PREFIX = "SELF-HEAL (#15219)"

export const PREP_SELFHEAL_SH_FUNCTIONS = `# ── prep bare-repo self-heal (#15219) ──
# prep_local_odb_damaged <repo> <fetch_stderr_file>
# exit 0 => the LOCAL object store is damaged and the repo must be re-cloned.
# exit 1 => NOT local damage (healthy repo, a transient transport error, or the
#           #9479 placeholder-OID race) — the caller must NOT quarantine.
prep_local_odb_damaged() {
  _repo=$1
  _errf=$2
  # Primary, network-free: a connectivity fsck fails only on a genuinely
  # missing/broken object in the EXISTING store. A transport failure or the
  # #9479 race leaves the store intact, so fsck passes and we fall through.
  if [ -d "$_repo" ] && ! git -C "$_repo" fsck --connectivity-only --no-progress >/dev/null 2>&1; then
    return 0
  fi
  [ -f "$_errf" ] || return 1
  # Secondary (defense in depth) — for the case where the missing objects are
  # referenced only by the incoming fetch's deltas, not by an existing ref, so
  # fsck of the current store still passes. Transport / auth / #9479-race
  # signatures are matched FIRST and win (return 1: do NOT quarantine).
  if grep -qiE 'did not send all necessary objects|bad object worktrees/|could not resolve host|connection (refused|timed out|reset)|unable to access|the remote end hung up|early eof|rpc failed|http/[0-9.]+ 5[0-9][0-9]|could not read username|authentication failed|remote error' "$_errf"; then
    return 1
  fi
  # Confirmed local-ODB-damage signatures.
  if grep -qiE 'unpack-objects failed|unresolved deltas|could not read [0-9a-f]{7,40}|object file .* is empty|loose object .* is corrupt|(packfile|pack) .*(corrupt|cannot be accessed)|missing (blob|tree|commit)|bad (tree|object) [0-9a-f]{7,40}|inflate: data stream error|failed to run repack|failed to traverse parents' "$_errf"; then
    return 0
  fi
  return 1
}

# prep_quarantine_and_reinit <repo>
# Rename a corrupt bare repo to a timestamped sibling (forensics preserved) and
# re-init a fresh one under the held flock. Bounds quarantine disk and logs
# every quarantine/prune loudly (No Silent Caps).
prep_quarantine_and_reinit() {
  _repo=$1
  _parent=$(dirname "$_repo")
  _base=$(basename "$_repo")
  _maxage=\${PREP_QUARANTINE_MAX_AGE_DAYS:-3}
  _maxkeep=\${PREP_QUARANTINE_MAX_KEEP:-3}
  [ "$_maxkeep" -ge 1 ] 2>/dev/null || _maxkeep=1
  # Prune quarantines older than the age bound.
  find "$_parent" -maxdepth 1 -type d -name "$_base.corrupt-*" -mtime +"$_maxage" 2>/dev/null | while IFS= read -r _d; do
    echo "${PREP_SELFHEAL_LOG_PREFIX}: pruning aged quarantine $_d (>\${_maxage}d)" >&2
    rm -rf "$_d"
  done
  # Enforce the count bound BEFORE creating the new one: keep the newest
  # (_maxkeep - 1) so the total after re-init is at most _maxkeep. Names are
  # UTC-timestamped, so a reverse lexical sort is newest-first.
  _keep=$((_maxkeep - 1))
  find "$_parent" -maxdepth 1 -type d -name "$_base.corrupt-*" 2>/dev/null | sort -r | while IFS= read -r _d; do
    _keep=$((_keep - 1))
    if [ "$_keep" -lt 0 ]; then
      echo "${PREP_SELFHEAL_LOG_PREFIX}: pruning surplus quarantine $_d (keep newest \${_maxkeep})" >&2
      rm -rf "$_d"
    fi
  done
  _ts=$(date -u +%Y%m%dT%H%M%SZ)-$$
  _dest="$_parent/$_base.corrupt-$_ts"
  echo "${PREP_SELFHEAL_LOG_PREFIX}: LOCAL ODB CORRUPTION in $_repo — quarantining to $_dest and re-initializing a fresh bare repo. fsck output follows:" >&2
  git -C "$_repo" fsck --connectivity-only 2>&1 | sed 's/^/${PREP_SELFHEAL_LOG_PREFIX} fsck: /' >&2 || true
  if ! mv "$_repo" "$_dest"; then
    echo "${PREP_SELFHEAL_LOG_PREFIX}: FATAL — could not quarantine $_repo to $_dest" >&2
    return 1
  fi
  touch "$_dest" 2>/dev/null || true
  git init --bare "$_repo" || return 1
  # Preserve the #14446 sole-gc-authority invariant on the fresh repo: disable
  # auto-gc so ephemeral step pods can't auto-gc and orphan a mid-repack (the
  # corruption writer this whole feature exists to recover from).
  git -C "$_repo" config gc.auto 0 || true
  echo "${PREP_SELFHEAL_LOG_PREFIX}: fresh bare repo initialized at $_repo (quarantine preserved at $_dest)" >&2
}`

export function prepFetchWithSelfHeal(
  fetchCmd: string,
  repo = "/ci-storage/repo"
): readonly string[] {
  return [
    `  if ! ${fetchCmd} 2>"$PREP_FETCH_ERR"; then`,
    `    cat "$PREP_FETCH_ERR" >&2`,
    `    if prep_local_odb_damaged "${repo}" "$PREP_FETCH_ERR"; then`,
    `      prep_quarantine_and_reinit "${repo}" || exit 1`,
    `      ${fetchCmd} || { echo "${PREP_SELFHEAL_LOG_PREFIX}: re-fetch after re-clone FAILED" >&2; exit 1; }`,
    `    else`,
    `      echo "${PREP_SELFHEAL_LOG_PREFIX}: fetch failed but local ODB intact (transport / #9479 race) — NOT quarantining" >&2`,
    `      exit 1`,
    `    fi`,
    `  fi`,
  ]
}
