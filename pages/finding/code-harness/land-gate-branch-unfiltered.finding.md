---
id: 400f937c-bc3d-5ea2-b7f4-05272529a20e
page-type-slug: finding
title: "Land gate branch unfiltered"
domain-slug: domain/global
---

# Claim

The merge queue's land gate adopts any completed pipeline matching the staging tree SHA, applying no filter on which branch that pipeline ran against. A feature-branch run can therefore satisfy a gate documented as testing the merged result. Identical tree SHAs carry identical content, so this alone does not admit untested content, but the guarantee then rests on tree-SHA equality rather than on the branch condition the surrounding prose states.

# Evidence

Read on 2026-08-11 in the code repo at project #18484's tree.

`packages/infra/ci/merge-queue/coordinator/src/dispatcher/advance-forming.ts` lines 161-201 adopt a `completed` pipeline whose tree SHA matches the staging tip. The lookup it calls, `find-completed-pipeline-by-tree-sha.ts` lines 57-66, filters on tree SHA and completion status and applies no branch predicate.

Established by reading the two call sites only.

NOT MEASURED — no instance of a feature-branch pipeline actually being adopted was found; the claim is about what the code permits, not about an observed adoption. Whether some caller upstream constrains the candidate set by branch before this lookup is reached was not traced. Whether two pipelines can share a tree SHA while differing in what they ran — different workflow selection on different branches over the same tree — was not checked, and that is the case where tree-SHA equality would stop covering the difference.
