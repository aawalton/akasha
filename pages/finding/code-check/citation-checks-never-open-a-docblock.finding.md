---
id: 0f3bc9f4-da3e-5cbe-a009-c2875cab7496
slug: citation-checks-never-open-a-docblock
page-type-slug: finding
title: "Citation checks never open a docblock"
domain-slug: domain/global
---

# Claim

Two standing checks judge whether a citation resolves — `check-source-position-citations` and `check-instructions-citations` — and both take their population as markdown files, 19 of 19. Neither opens a TypeScript docblock. So a path or document cited from a code comment is never judged, and the checks report a clean population that excludes where most citations in this repository actually live. Two dead citations in one file stood since #13992 and nothing standing could have found them.

# Evidence

Found on 2026-08-10 verifying #18431, a child of tree #18484, whose delivering seat hit both dead citations by hand while repairing a false comment and reported that nothing would have caught them. The two were in `packages/infra/ci/worker/src/pure/check-definition-registry.ts`, naming a docs file in a package with no docs directory.

The shape is this initiative's own subject rather than a tidiness complaint: a check that states a bound over 19 of 19 and exits 0 reads identically whether it looked everywhere a defect can stand or only where none does. What makes it worth a project is that the excluded region is the larger one — this estate carries far more path citations in TypeScript headers than in markdown, and `Header By Hand` on `domains/code-check.md` requires those headers be written and repaired by hand, which is exactly the process that produces dangling ones.

It joins a class already filed. `findings/code-repo/checks-docs-citations-dangling` counts 36 files citing `packages/infra/checks/docs/`, a directory gone from tracking, and calls 36 a floor because bare-name citations escape its search. That finding names the instances; this one names why nothing standing reports them.

NOT MEASURED. How many TypeScript docblock citations across the repository do not resolve — no scan was run, and the 36 in the neighbouring finding is a different search. Whether widening either check to TypeScript sources is cheap or expensive was not costed. Whether the 19-of-19 markdown population is itself right for what those two checks were cut to do was not examined.
