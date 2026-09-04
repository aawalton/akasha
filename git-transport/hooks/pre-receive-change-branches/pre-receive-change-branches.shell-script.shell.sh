#!/bin/sh
# Pre-receive hook: branch naming + main branch protection.
#
# Policy 1 — Branch naming:
#   New branches (refs/heads/*) must match one of the allowed patterns:
#     - change-NNNN (one or more digits)
#       A unit of work, minted by `ops branch start`.
#     - merge-NNNN (one or more digits)
#       The fold `ops branch merge` builds when more than one branch is
#       submitted at once, and pushes so its checks can run on it.
#     - project-NNNN (one or more digits)
#       The retired project model's branch. Kept because several are still
#       in flight and must still be able to land; nothing mints new ones.
#   Creation of any other branch is rejected. Updates and deletions of
#   existing branches are not affected.
#
# Policy 2 — Main protection:
#   refs/heads/main can only be updated when ALL of the following hold:
#   1. It is a strict fast-forward (old is an ancestor of new).
#   2. The new tip is reachable from at least one branch Policy 1 admits
#      (either already on the server, or being pushed atomically in the
#      same transaction).
#   3. The update is not a deletion and not a creation.
#
# There is no bypass. Rationale: the flow pushes a change branch, waits for
# its checks, then fast-forwards main to the same tip — that is the only path
# that ever touches main, and it already satisfies these constraints. Any
# other push to main is either a direct manual push (what this hook exists to
# prevent) or a process error.
#
# THE PATTERNS ANCHOR ON A DIGIT, WHICH IS NOT DECORATION. `merge-*` alone
# would also match a `merge-queue/...` ref, because the glob crosses `/`;
# `merge-[0-9]*` cannot. The merge queue is gone and its staging ref is no
# longer admitted, but the ref it left behind still stands on the server, and
# Policy 1 does not gate updates to a branch that already exists.

set -eu

ZERO=0000000000000000000000000000000000000000

# Pre-receive receives ref updates on stdin; buffer them to a file so we can
# scan the update set multiple times (branch naming check, main protection,
# and branch tip lookups for atomic pushes).
UPDATES_FILE=$(mktemp)
trap 'rm -f "$UPDATES_FILE"' EXIT
cat > "$UPDATES_FILE"

# is_on_landing_branch COMMIT
# Returns 0 if COMMIT is reachable from the tip of any branch Policy 1 admits
# — either an existing ref on the server, or an incoming ref update in this
# same push (for atomic branch+main pushes).
is_on_landing_branch() {
  commit=$1

  # Existing admitted branches whose tip contains this commit.
  if git for-each-ref \
        --format='%(refname)' \
        --contains="$commit" \
        'refs/heads/change-[0-9]*' \
        'refs/heads/merge-[0-9]*' \
        'refs/heads/project-[0-9]*' 2>/dev/null \
      | head -n 1 | grep -q .; then
    return 0
  fi

  # Incoming admitted ref updates in this push transaction.
  while IFS=' ' read -r _old new ref; do
    case "$ref" in
      refs/heads/change-[0-9]*|refs/heads/merge-[0-9]*|refs/heads/project-[0-9]*)
        if [ -n "${new:-}" ] && [ "$new" != "$ZERO" ]; then
          if git merge-base --is-ancestor "$commit" "$new" 2>/dev/null; then
            return 0
          fi
        fi
        ;;
    esac
  done < "$UPDATES_FILE"

  return 1
}

# ── Pass 1: Branch naming ──
# New branches must match an admitted pattern. Updates and deletions are
# unaffected.
while IFS=' ' read -r oldrev newrev refname; do
  # Only branch creation (oldrev is zero, newrev is not).
  [ "$oldrev" = "$ZERO" ] || continue
  [ "$newrev" != "$ZERO" ] || continue
  # Only refs/heads/* (not tags, notes, etc.).
  case "$refname" in refs/heads/*) ;; *) continue ;; esac
  echo "$refname" | grep -qE '^refs/heads/change-[0-9]+$' && continue
  echo "$refname" | grep -qE '^refs/heads/merge-[0-9]+$' && continue
  echo "$refname" | grep -qE '^refs/heads/project-[0-9]+$' && continue
  # Reject everything else.
  branch="${refname#refs/heads/}"
  echo "[pre-receive] REJECTED: branch \"$branch\" does not match an" >&2
  echo "[pre-receive]           allowed pattern (change-NNNN or merge-NNNN)." >&2
  echo "[pre-receive]" >&2
  echo "[pre-receive]           Mint a branch with 'ops branch start', which" >&2
  echo "[pre-receive]           names it and writes its page." >&2
  exit 1
done < "$UPDATES_FILE"

# ── Pass 2: Main branch protection ──
# Evaluate every ref update; reject the whole push on the first violation.
while IFS=' ' read -r oldrev newrev refname; do
  [ "$refname" = "refs/heads/main" ] || continue

  if [ "$newrev" = "$ZERO" ]; then
    echo "[pre-receive] REJECTED: deletion of refs/heads/main is not allowed" >&2
    exit 1
  fi

  if [ "$oldrev" = "$ZERO" ]; then
    echo "[pre-receive] REJECTED: creation of refs/heads/main is not allowed" >&2
    exit 1
  fi

  if ! git merge-base --is-ancestor "$oldrev" "$newrev" 2>/dev/null; then
    echo "[pre-receive] REJECTED: refs/heads/main update must be a fast-forward" >&2
    echo "[pre-receive]           old=$oldrev new=$newrev" >&2
    exit 1
  fi

  if ! is_on_landing_branch "$newrev"; then
    echo "[pre-receive] REJECTED: refs/heads/main can only advance to a commit" >&2
    echo "[pre-receive]           that is on a change-NNNN or merge-NNNN branch." >&2
    echo "[pre-receive]           new tip $newrev is not reachable from any" >&2
    echo "[pre-receive]           such branch (existing or in this push)." >&2
    echo "[pre-receive]           Push your work to its branch first, then use" >&2
    echo "[pre-receive]           'ops branch merge' to land it." >&2
    exit 1
  fi
done < "$UPDATES_FILE"

exit 0
