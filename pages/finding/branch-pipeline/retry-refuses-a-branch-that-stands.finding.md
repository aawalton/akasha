---
id: 948cfd22-0c9f-50b1-b28e-89cd50eac40d
page-type-slug: finding
title: "Retry refuses a branch that stands"
domain-slug: domain/branch-pipeline
---

# Claim

`ops pipeline retry` refuses a pipeline on the ground that its branch is not on origin, while the branch stands on origin at exactly the commit that pipeline ran. The refusal reads as a stale branch rather than as a wrong lookup, so the seat that meets it mints a second pipeline instead of retrying the one it has.

# Evidence

A seat landing #19153 ran `ops pipeline retry --seq 28019` and was refused with `branch project-19153 not found on origin`. It then ran `git ls-remote` and saw that branch on origin at the pipeline's own commit.

The refusal is the expensive kind: a retry over an existing pipeline is cheap, and what the seat did instead was mint a fresh one, paying a full run of the same checks. Nothing in the refusal suggests the lookup rather than the branch, so the seat had no reason to doubt it until it checked by hand.

Both readings are the delivering seat's rather than mine. I did not reproduce the refusal, and the pipeline it named has since been superseded, so reproducing it now would need a fresh case.
