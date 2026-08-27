---
id: 35a7420d-55ca-55a1-b953-7354fa7722d8
slug: system-shape-assumed-wrong
page-type-slug: finding
title: "System shape assumed wrong"
domain-slug: domain/agent-harness
---

# Claim

An agent holds a shape for this system that the system does not have, and acts on it before testing it. The act runs, reports success, and the wrong shape is found only when something reaches for the part that was assumed. Where the act installed an instrument, the instrument comes back green over an empty subject, and the assumption is never tested at all.

# Evidence

Measured 2026-08-27 in akasha.

`infra/cluster-checks/src/checks/check-worker-shape-detect.ts` holds the check. Re-measured 2026-08-27: `check-configs-source-scanners.ts` no longer exists, none of the 93 pages under `pages/cluster-check/` names `worker-shape`, and nothing outside the check's own `worker-shape-*` libs imports the module — so it is registered nowhere and now runs never rather than green. Its subject is every file ending `.worker.ts` (`infra/cluster-checks/src/lib/worker-suffix.ts:1`, read at `check-worker-shape-detect.ts:70`). `git ls-files | grep -c '\.worker\.ts$'` returns 0 across all 89,571 tracked files, and `find` over the working tree returns 0 as well.

The absorption that would have brought those files has already landed. `pages/finding/akasha-repo/checks-written-against-a-small-tree.finding.md` measured the whole incoming set at 90,713 tracked files; the tree now holds 89,571, so the code repository has arrived and brought no `.worker.ts` with it.

The shape the check asserts is not there either. Line 35 tests the source for `from "@shared/worker-runtime"`; the only other tracked mention of `worker-runtime` is a dangling project reference at `infra/cluster-checks/tsconfig.json:38`, and `shared/` holds no such package. The check names an import that resolves to nothing, over a population that is empty, and comes back exactly like a clean repository.

Its own words described the failure mode of an untested assumption, in its subject rather than in itself: a worker whose emitted name does not match its filename stem "reads as `NEVER`, zero rows for the whole retention window, while running perfectly." That was the comment at line 44; re-measured 2026-08-27, `NEVER` matches nowhere in the file and the comment no longer stands.

The page type governing it already carries the rule this breaks. `pages/page-type/cluster-check.page-type.md:31-39`: "Counted Or Held — State a least count for a check's subject and what it rests on, or hold the check. A subject that empties reads exactly like a clean repo, and nothing reports the difference."

NOT MEASURED: I did not run the check. Its population is built from a graph at a tree sha, and I judged it from `git ls-files` against the working tree instead, so the empty subject is inferred rather than read off a run. I did not measure how often an assumed shape goes untested; this is one instance, found by looking.
