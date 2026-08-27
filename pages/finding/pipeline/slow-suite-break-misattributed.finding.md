---
id: 2874601f-7d5b-5a02-a0a0-9baae086673b
page-type-slug: finding
title: "Slow suite break misattributed"
domain-slug: page-type/pipeline
---

# Claim

Slow test suites are excluded from branch CI, so a branch can change behaviour a slow-suite test asserts, pass its own green CI, and land — with the contradiction surfacing only later when a nightly or an unrelated worker's post-land sweep next runs the file, at which point the break is attributed to whoever is looking at it rather than to the commit that caused it.

# Evidence

Filed as project #16170, domain `pipeline`, status `someday_maybe`.

**Problem.** Slow test suites are excluded from branch CI, so a branch can break behaviour a slow-suite test asserts, pass its own green CI, and land — the break surfaces only when a nightly or another worker's post-land sweep next runs the file, and gets attributed to whoever is looking, not the landing commit. Cost: the finder must do timeline forensics to prove it isn't theirs.

**Observed instance, fully timed:** 09:17Z nightly passes `packages/shared/pages/access/src/upsert.database.test.ts`; 10:33Z Alan lands e4d153d24a on #15971 (owner ember), an owner-reassignment guard at the single patchUpdate lowering; ~14:00Z #16021's worker's first sweep goes RED. `upsert.database.test.ts:112` asserted a cross-owner reassignment succeeds; guard now rejects (P0001). #15971's branch CI never ran that file (slow-excluded) and landed after #16021's branch tip, so #16021's worker inherited it as a third party and built this timeline before routing it.

**Why not "just run them":** #16021 measured one suite at 52-72s across four runs, set a 300s budget for real node variance; fix must close the attribution gap, not run every slow suite on every branch.

**Candidate directions, undecided:** (1) changed-surface targeting — run only slow suites whose subject the branch touched; (2) attribute at the failure — derive the first commit that could have caused a nightly break, name it in the alert; (3) post-land gate on affected files between land and next nightly.

**Ordering judgment:** (2) cheapest/earliest for the harm actually paid; measure (1)'s mapping cost on the pages-write-boundary surface before generalising.

**Must not become:** loosening the slow-suite definition or moving files between buckets to hide one break.

**Related:** #16021 (landed 1f6ff789, 11/12 shards green); #15971/ember (routed); #16022 (sibling — attribution within a shard vs. this row's across commits).
