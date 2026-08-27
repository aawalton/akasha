---
id: f1ed1058-aea1-5db9-9033-dc852babb3b4
slug: shadow-regen-reverts-migrations
page-type-slug: finding
title: "Shadow regen reverts migrations"
domain-slug: domain/global
---

# Claim

The schema-snapshot regenerator builds against a shadow database that can lag the live
one, so a regen silently rewrites landed migrations out of the snapshot, and its output
is indistinguishable from a correct regen.

# Evidence

Observed on 2026-08-04 while applying migration #5578 from worktree
`/home/walton/worktrees/17763` with `ops migration run --seq 5578`.

The run reported building against shadow `shadow_17763`, then wrote both the snapshot and
the generated TS types. It produced two changes I did not ask for and one I did:

  - `schema/public/functions/page_patch_by_seq_if_unclaimed.sql` deleted — intended, the
    whole point of the migration.
  - `src/generated/database.ts` lost the dropped function's type — intended.
  - `schema/public/functions/get_status_bar_snapshot.sql` rewritten BACKWARD: the diff
    removes the `held_seqs` MATERIALIZED CTE and restores three `attributes->>'claimedAgent'`
    reads it had replaced. 4 insertions, 19 deletions.

The third is a reversion of migration #5576, whose snapshot commit is `f1103fb80f`. That
migration is applied on the live database: `select ... from pg_proc where
proname='get_status_bar_snapshot'` returns a body containing `held_seqs`. So the shadow
did not have #5576 applied, and the regen took the shadow as authoritative.

Had the regen output been committed whole — which is the ordinary act, since the command
prints no distinction between the file it targeted and the files it collaterally rewrote —
the snapshot would have asserted a production state two migrations stale, and the next
thing to apply the snapshot would have reverted #5576 in the database.

WHAT I DID NOT MEASURE. I did not determine why `shadow_17763` lacked #5576, whether
other shadows lag, how many other snapshot files this or previous regens rewrote
backward, or whether any such reversion has already been committed on any branch. I
checked one file because `git status` showed it; a regen touching a file whose content
happened to match would leave no trace at all. I also did not check whether any gate
compares the snapshot against the live database, which would be the instrument that
catches this class.
