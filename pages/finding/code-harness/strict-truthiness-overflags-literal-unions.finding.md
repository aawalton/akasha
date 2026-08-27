---
id: 9af30b37-2ce5-57fe-b210-97e951242abb
page-type-slug: finding
title: "Strict truthiness overflags literal unions"
domain-slug: domain/global
---

# Claim

`check-strict-truthiness` tests a "falsy-valid" member using the coarse `ts.TypeFlags.StringLike`, which any string-like type satisfies including literal unions with no falsy member, so the check fires on code where `if (x)` and `x !== undefined` are exactly equivalent — unlike its sibling `check-strict-boolean-expressions`, which correctly requires an actual falsy literal member.

# Evidence

Project #16081, domain `code-harness`. Reported by the #16015 worker (nimue's) while doing the type-aware gate rework; recorded by dalla as a checks-correctness defect in its own right. Carried no objective; notes only.

DEFECT: for a union such as `"pending" | "running" | "done" | "failed" | undefined`, there is no `""` member to distinguish `if (x)` from `x !== undefined`, yet the check still fires because `ts.TypeFlags.StringLike` is satisfied by any string-like type, not only ones with a falsy member.

SIBLING GETS IT RIGHT (making this a defect rather than a design choice): `check-strict-boolean-expressions` requires `isStringLiteral() && value === ""` — an actual falsy member — rather than mere string-likeness.

OBSERVED INSTANCES, both surfaced by #16015's per-package-program change, both remediated there (behaviour-identical rewrite, not suppression) rather than fixing the check itself:
- `packages/agents/shared/db-filler-jobs.ts:364`
- `packages/alanwalton/awen/src/awen/design.ts:71`
So the remediations are legitimate, but they remediate an over-flag — the code was not wrong.

WHY IT MATTERS BEYOND NOISE: an over-flagging gate teaches agents to rewrite correct code to appease it, and each such rewrite is a small unjustified change that reads in history as a fix. It also erodes the gate's authority — once a check is known to cry wolf, the next genuine finding gets argued with instead of fixed.

SCOPE (not yet done): align `check-strict-truthiness`'s falsy-valid criterion with the sibling's (require an actual falsy literal member, not `StringLike`), with a test pinning both directions — a literal union with no falsy member must not fire, and a union that does contain `""` (or `0`, or `false`) must still fire. Narrowing a check is the direction that can silently stop catching real things, so the must-still-fire half is the load-bearing test.

NOT urgent: the gate over-flags, it does not under-flag, so nothing is rotting behind it.
