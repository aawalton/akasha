#!/bin/sh
# Post-receive hook: mirror this repo to the destination IT declares.
#
# The destination is `mirror.url` in the firing repo's own config, reached
# through the same $GIT_DIR handle that identifies whose push this was. Nothing
# in the hook's environment names a destination, so a push cannot reach one
# declared for a different repo — which matters because the push below is
# `--force --prune` and would otherwise empty another repo's mirror with no
# undo.
#
# The credential is the opposite kind of thing and stays where it is: one value
# for the pod, naming no repo. It is never written into repo config, which
# lives in the clear on the store. The helper reads GITHUB_ACCESS_TOKEN from the
# environment it inherits rather than taking it as an argument, so the token
# never enters this process's argv.
#
# THE MIRROR RUNS AFTER THE PUSH RETURNS. `receive-pack` holds the client open
# until this hook's output closes, so a mirror run inline is time the pusher
# waits — a failing destination held every push for eleven seconds. The work is
# handed to a detached child with its own log, and the push returns at the ref
# update. What the run did lands in `mirror.state` beside the repo, which is the
# machine-readable signal a mirror fell behind that the client's stderr used to
# be the only form of.
#
# MODES. `mirror.mode` is `history` by default: every branch and tag, as they
# stand. `snapshot` mirrors the tree of `main` onto a lineage rooted here — one
# commit per push with no parent before the first — for a repo whose own history
# carries an object the destination will not take. The tree is mirrored whole
# either way; what a snapshot gives up is the commits behind it.
#
# There is no separate SSD-backup mirror step. The live repo lives on the
# SSD hostPath; ref accept and durable write happen on the same disk in the
# same operation.

# Derive repo path from GIT_DIR
case "$GIT_DIR" in
  .) REPO_DIR=$(pwd) ;;
  /*) REPO_DIR="$GIT_DIR" ;;
  *) REPO_DIR="$(pwd)/$GIT_DIR" ;;
esac

# Drain stdin (git requires all refs to be read). The mirror runner is re-invoked
# with no stdin to drain, so only the hook proper reads here.
if [ "$MIRROR_ONLY" != 1 ]; then
  while read -r _OLDREV _NEWREV _REFNAME; do :; done
fi

MIRROR_URL=$(git -C "$REPO_DIR" config --get mirror.url 2>/dev/null || true)

if [ -z "$MIRROR_URL" ]; then
  echo "[post-receive] ERROR: $REPO_DIR declares no mirror.url." >&2
  echo "[post-receive]        This hook and a destination are provisioned together," >&2
  echo "[post-receive]        so one without the other is a misconfiguration rather" >&2
  echo "[post-receive]        than a repo that opted out of mirroring." >&2
  exit 1
fi

MIRROR_MODE=$(git -C "$REPO_DIR" config --get mirror.mode 2>/dev/null || true)
[ -n "$MIRROR_MODE" ] || MIRROR_MODE=history

case "$MIRROR_MODE" in
  history|snapshot) ;;
  *)
    echo "[post-receive] ERROR: $REPO_DIR declares mirror.mode $MIRROR_MODE," >&2
    echo "[post-receive]        which is neither history nor snapshot." >&2
    exit 1
    ;;
esac

STATE="$REPO_DIR/mirror.state"
LOG="$REPO_DIR/mirror.log"
LOCK="$REPO_DIR/mirror.lock"
WANTED="$REPO_DIR/mirror.wanted"
SNAPSHOT_REF=refs/heads/mirror-root

# GIT_TERMINAL_PROMPT=0 turns a missing or rejected credential into an
# immediate failure instead of a read on a /dev/tty that is not there.
CREDENTIAL_HELPER='!f() { echo username=x-access-token; echo "password=$GITHUB_ACCESS_TOKEN"; }; f'
export GIT_TERMINAL_PROMPT=0
export GIT_AUTHOR_NAME="${GIT_AUTHOR_NAME:-git-transport}"
export GIT_AUTHOR_EMAIL="${GIT_AUTHOR_EMAIL:-git-transport@invalid}"
export GIT_COMMITTER_NAME="${GIT_COMMITTER_NAME:-git-transport}"
export GIT_COMMITTER_EMAIL="${GIT_COMMITTER_EMAIL:-git-transport@invalid}"

# A push with no ceiling is a child that can outlive the reason for it, and
# there is no one to notice: this runs detached with nothing waiting on it.
PUSH_CEILING=600
if command -v timeout >/dev/null 2>&1; then
  BOUNDED="timeout $PUSH_CEILING"
else
  BOUNDED=""
fi

record() {
  printf '%s %s %s %s\n' "$1" "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$MIRROR_MODE" "$2" > "$STATE"
}

mirror_history() {
  # Branches and tags are separate pushes: --mirror would include refs/pull/*,
  # which GitHub creates on its side and rejects on push.
  if ! $BOUNDED git -c "credential.helper=$CREDENTIAL_HELPER" -C "$REPO_DIR" \
       push "$MIRROR_URL" --all --force --prune 2>&1; then
    echo "[post-receive] ERROR: branch push to $MIRROR_URL failed" >&2
    record fail "branch push to $MIRROR_URL failed"
    return 1
  fi

  if ! $BOUNDED git -c "credential.helper=$CREDENTIAL_HELPER" -C "$REPO_DIR" \
       push "$MIRROR_URL" --tags --force 2>&1; then
    echo "[post-receive] ERROR: tag push to $MIRROR_URL failed" >&2
    record fail "tag push to $MIRROR_URL failed"
    return 1
  fi
  record ok "$MIRROR_URL"
  return 0
}

mirror_snapshot() {
  TREE=$(git -C "$REPO_DIR" rev-parse -q --verify "refs/heads/main^{tree}" 2>/dev/null || true)
  if [ -z "$TREE" ]; then
    echo "[post-receive] ERROR: $REPO_DIR holds no main to take a snapshot of" >&2
    record fail "no main to snapshot"
    return 1
  fi

  PARENT=$(git -C "$REPO_DIR" rev-parse -q --verify "$SNAPSHOT_REF" 2>/dev/null || true)
  HELD=""
  [ -n "$PARENT" ] && HELD=$(git -C "$REPO_DIR" rev-parse -q --verify "$SNAPSHOT_REF""^{tree}" 2>/dev/null || true)

  if [ "$TREE" = "$HELD" ]; then
    record ok "$MIRROR_URL (tree unchanged)"
    return 0
  fi

  TIP=$(git -C "$REPO_DIR" rev-parse -q --verify refs/heads/main 2>/dev/null || true)
  MESSAGE="the repository as it stands at $TIP"
  if [ -n "$PARENT" ]; then
    COMMIT=$(git -C "$REPO_DIR" commit-tree "$TREE" -p "$PARENT" -m "$MESSAGE") || COMMIT=""
  else
    COMMIT=$(git -C "$REPO_DIR" commit-tree "$TREE" -m "$MESSAGE") || COMMIT=""
  fi
  if [ -z "$COMMIT" ]; then
    echo "[post-receive] ERROR: $REPO_DIR could not compose a snapshot commit" >&2
    record fail "commit-tree failed"
    return 1
  fi
  if ! git -C "$REPO_DIR" update-ref "$SNAPSHOT_REF" "$COMMIT"; then
    echo "[post-receive] ERROR: $REPO_DIR could not move $SNAPSHOT_REF" >&2
    record fail "update-ref $SNAPSHOT_REF failed"
    return 1
  fi

  if ! $BOUNDED git -c "credential.helper=$CREDENTIAL_HELPER" -C "$REPO_DIR" \
       push "$MIRROR_URL" "$SNAPSHOT_REF:refs/heads/main" --force 2>&1; then
    echo "[post-receive] ERROR: snapshot push to $MIRROR_URL failed" >&2
    record fail "snapshot push to $MIRROR_URL failed"
    return 1
  fi
  record ok "$MIRROR_URL ($COMMIT)"
  return 0
}

mirror_now() {
  echo "[post-receive] Mirroring $REPO_DIR to $MIRROR_URL ($MIRROR_MODE)"
  if [ "$MIRROR_MODE" = snapshot ]; then
    mirror_snapshot
  else
    mirror_history
  fi
}

# THE MIRROR MUST LEAVE THIS PROCESS GROUP. git-http-backend is spawned as a
# process-group leader and the transport SIGKILLs that whole group as soon as
# the response body closes — which is the very moment this hand-off exists to
# run at. A child that only closes its descriptors is still in the group and
# dies mid-push, having written its announce line and nothing after it. setsid
# gives the runner a session of its own, out of the sweep's reach.
#
# ONE MIRROR PER REPOSITORY AT A TIME. A busy repository takes pushes faster
# than a mirror finishes, and a mirror per push is a pile of concurrent
# --force --prune runs racing each other onto one ref lock. The flock admits
# one. A push arriving while it is held leaves its mark and returns, and the
# holder takes that mark up rather than a second runner starting.
#
# THE CHILD MUST HOLD NO DESCRIPTOR THE CLIENT IS WAITING ON. Redirecting the
# two streams is not enough: a hook inherits descriptors past 0, 1 and 2 from
# the transport, and receive-pack reads until every copy of its end is closed —
# so a child holding one keeps the push open for as long as it runs, which is
# the whole cost this hand-off exists to remove.
mirror_detached() {
  exec >>"$LOG" 2>&1 </dev/null
  for fd in 3 4 5 6 7 8 9; do
    eval "exec $fd>&-" 2>/dev/null || true
  done
  exec 8>"$LOCK"
  if command -v flock >/dev/null 2>&1; then
    flock -n 8 || exit 0
  fi
  while [ -e "$WANTED" ]; do
    rm -f "$WANTED"
    mirror_now
  done
}

if [ "$MIRROR_ONLY" = 1 ]; then
  mirror_detached
  exit 0
fi

echo "[post-receive] Mirroring $REPO_DIR to $MIRROR_URL ($MIRROR_MODE), after this push returns" >&2

# The mark goes down before the runner starts, so a push that arrives while a
# mirror is already running is never lost: the holder sees it on its next turn.
: > "$WANTED"

if command -v setsid >/dev/null 2>&1; then
  MIRROR_ONLY=1 GIT_DIR="$REPO_DIR" setsid /bin/sh "$0" </dev/null >/dev/null 2>&1 &
else
  mirror_detached &
fi

exit 0
