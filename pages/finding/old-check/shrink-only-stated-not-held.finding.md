---
id: 57ae3f4d-3a2e-5e85-926f-9ee156c3eba3
slug: shrink-only-stated-not-held
page-type-slug: finding
title: "Shrink only stated not held"
domain-slug: domain/old-check
---

# Claim

Seven sites in the estate hold a shrink-only baseline and all seven document the discipline in their own words, unprompted. Three enforce it in code with an exit 2. One states it only as prose in a generated header, one holds it by policy, one does not hold it at all, and `query-tail-baseline.ts:188` prints `WARNING: baseline GREW — the ratchet only shrinks` and then proceeds, asking the author to review before committing.

# Evidence

Measured 2026-08-08 against `~/code` at `4799485a23`, over 16,075 files searched for `grandfather` and read where they could hold a check baseline.

    site                                 how shrink-only is held
    check-liveness-routing               code refusal, exit 2
    check-prose-mechanism-restatement    code refusal, exit 2
    check-cli-help-flag-references       code refusal, exit 2
    undeclared-attributes-gate           prose contract in the generated header
    query-tail-baseline                  warns and proceeds
    check-client-page-access-boundary    policy — the list is empty
    check-tstl-colon-dot-self-shift      not held

`query-tail-baseline.ts:188` is the sharpest. Its own text states the discipline and its behaviour does not hold it:

    WARNING: baseline GREW — the ratchet only shrinks; a NEW sustained offender
    is fixed with a follow-up perf project, not grandfathered. Review before committing.

Line 168 does the same for the degraded case, warning that regenerating "would inflate the per-query breach budget and HIDE a live regression". Both are warnings on a path that continues.

`undeclared-attributes-gate.ts:9` calls its artifact "the committed ratchet baseline" and its generated header at `:232` states the discipline outright — "Entries are only ever REMOVED … a NEW pair is fixed with a definition, never a baseline edit" — but nothing refuses a widening write. The contract is on the artifact, where the next author will read it, and not in the code, which is where it would hold.

Two sit outside the checks tree entirely — the undeclared-attributes gate in `packages/alanwalton/projects/cli`, and `query-tail-baseline` in Prometheus tooling under `packages/infra/k8s`. The discipline is not a checks-tree habit, and neither is the gap between stating it and holding it.

What varies is not the intent. Every one of the seven authors wrote the rule down for themselves. What varies is whether anything stops the next person, and in three cases nothing does.
