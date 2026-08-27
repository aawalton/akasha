---
id: 14ad769f-e5c3-5435-9793-ba3dd9649d81
page-type-slug: finding
title: "Deploy remedy bypasses its own read gate"
domain-slug: domain/global
---

# Claim

The deploy preflight's dirty-launcher refusal prints `ops launcher realign --discard-local-changes` as the remedy. The bare verb refuses again, lists the paths a second time and says "Read them first" — a gate built so no unattended run throws away work nobody saw. Printing the flagged form routes a caller past that gate in one paste, into a checkout every seat shares, destroying uncommitted work it did not make. The bare verb costs one invocation and lands the caller on the gate.

# Evidence

`packages/alanwalton/projects/cli/src/lib/move-to-deploy.ts:169` composes the refusal for `deploy_main_dirty`:

    "\nRead them, then clear them:\n  ops launcher realign --discard-local-changes"

The message above it does most of the work: it lists each blocking path and states the checkout "is read-only and shared by every deploy on this workstation, so nothing here is yours to commit". Its own comment records that the text used to read "commit, discard, or stash" and was narrowed because `commit` was the only one an agent could perform, and performing it caused the outage. This line has been corrected once already, in the same direction.

The gate it skips is `decide-launcher-realign.ts:85`. Without the flag the verb refuses, prints every dirty path, and says "Read them first. Committing them here is not the cure". Its docblock states the intent verbatim: "what it buys is that no unattended run ever throws away something nobody saw."

The flag's own help says "This destroys work no ref can give back — read the listing first." Every part of the surface asks the caller to read the listing. The one line a caller copies is the one that makes reading optional.

RAISED BY A REAL CASE, 2026-08-12. A seat on #18846 rendered `prune-ci-storage-script.ts` and ran it on the workstation to prove the reaping worked. Line 76 is `git config --global --add safe.directory "$REPO"`, and `~/.gitconfig` symlinks into `~/code`, so three runs left three lines in a tracked file and blocked every deploy from the machine. That seat read the diff first and then reported that the shape invites the opposite order.

NOT CLAIMED: that anyone has lost work this way yet.
