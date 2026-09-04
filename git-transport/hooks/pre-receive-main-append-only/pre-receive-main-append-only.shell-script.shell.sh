#!/bin/sh
# Pre-receive policy for a repo whose job is to BE a second copy.
#
# refs/heads/main may be created, may only fast-forward, and may not be
# deleted. Every other ref is unconstrained.
#
# Why a rewind is refused here and nowhere else: `post-receive` mirrors with
# `--force --prune`, so the off-cluster copy reproduces whatever this repo
# holds, a corruption included. A mirror that faithfully reproduces a rewind is
# not a backup, and this is the only point in the chain where the rewind can
# still be refused — after it, both copies agree and agree wrongly.
#
# Why creation is nonetheless allowed: a restore pushes into an empty repo, so
# a policy that refused creation would aim the guard at the recovery path it
# exists to protect. That trade is available because restore READS and
# replication WRITES — a clone is the only operation a restore needs — so the
# two legs use disjoint operations and this policy can be arbitrarily strict
# without holding recovery hostage.
#
# There is no project-NNNN naming rule and no CI-reachability clause: a repo
# that is a mirror source has neither project branches nor pipelines, and the
# code repo's policy would reject its every push. Which repository carries
# which policy is declared where the repositories are made ready.

set -eu

ZERO=0000000000000000000000000000000000000000

while IFS=' ' read -r oldrev newrev refname; do
  [ "$refname" = "refs/heads/main" ] || continue

  if [ "$newrev" = "$ZERO" ]; then
    echo "[pre-receive] REJECTED: deletion of refs/heads/main is not allowed." >&2
    echo "[pre-receive]           This repo is the second copy of a tree whose first" >&2
    echo "[pre-receive]           copy is one disk; the mirror behind it follows" >&2
    echo "[pre-receive]           whatever happens here." >&2
    exit 1
  fi

  # Creation. An empty repo is what a restore pushes into.
  if [ "$oldrev" = "$ZERO" ]; then
    continue
  fi

  if ! git merge-base --is-ancestor "$oldrev" "$newrev" 2>/dev/null; then
    echo "[pre-receive] REJECTED: refs/heads/main must fast-forward." >&2
    echo "[pre-receive]           old=$oldrev new=$newrev" >&2
    echo "[pre-receive]           The mirror reproduces a rewind exactly, so this is" >&2
    echo "[pre-receive]           the last point at which it can be refused." >&2
    exit 1
  fi
done

exit 0
