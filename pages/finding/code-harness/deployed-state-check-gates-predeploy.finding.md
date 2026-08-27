---
id: 5b274d82-d428-569a-83fb-31db7b733fb6
slug: deployed-state-check-gates-predeploy
page-type-slug: finding
title: "Deployed state check gates predeploy"
domain-slug: domain/global
---

# Claim

A check that reads deployed state while gating a pre-deploy pipeline deadlocks whenever
the two drift, because the only act that can satisfy the check is the land the check is
refusing.

# Evidence

Observed on 2026-08-04 taking project #17763 through `ops project deploy`.

`check-no-raw-plpgsql` reports any plpgsql function in the schema snapshot with no TS
source under `<pkg>/proc/src/`. The snapshot is a mirror of the deployed database,
regenerated when a migration applies. Commit `6a562996aa` deleted the TS port of
`public.page_patch_by_seq_if_unclaimed` and left the deployed function standing, so the
check had a standing violation nothing in a branch could clear.

Migration #5578 drops the function and was filed `contract`. Per `ops project deploy
--help`, contract migrations apply after main CI passes, which is after the merge-queue
fast-forward. So the ordering was:

  - branch CI: 156 of 157, the one red being this check (pipelines 26986-26988).
  - deploy enqueued; merge queue ran staging CI over the MERGED result (pipeline 26989),
    which runs the same check, which failed, which ejected entry 11253.
  - nothing landed, so #5578 never applied, so the check could not go green.

The cycle broke only by reclassifying #5578 to `expand`, which applies in the deploy's
first phase, before the enqueue. That was defensible here because the calling code left
in an already-deployed commit, so the contract was merely overdue. A contract migration
that is genuinely not yet safe would have had no such escape.

WHAT I DID NOT MEASURE. I did not enumerate which other checks read deployed state — I
found this one by having it fail. I did not establish whether the merge queue's staging
CI runs the identical check set as branch CI, only that both ran this one. I did not
check whether the deploy verb could order contract migrations before the enqueue without
breaking the guarantee that ordering exists for, nor whether any project has previously
hit this and resolved it some other way.
