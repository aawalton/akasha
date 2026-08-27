---
id: 5633b98d-0fc7-5da5-8d55-49fd9276151b
page-type-slug: finding
title: "The owner-dispatch classifier is reached by nothing but its own tests"
domain-slug: repo/code-repo
---

# Claim

`packages/alanwalton/projects/core/src/lib/owner-dispatch-classify.ts` is reached by nothing but its own tests, and since #19392 removed the last non-test file naming it, nothing outside that test set names the module at all.

# Evidence

Measured on 2026-08-18, across `packages/` excluding `dist/`, on `origin/main` at `906cae7506`.

The module exports four symbols. `classifyOwnerRowsWith` is imported by seven files, every one a `.unit.test.ts`. `mayRedispatchAfterStaleClaim` is imported by two, both tests. `OwnerRowClassification` is named outside its own file only by `_owner-dispatch-classify-test-helpers.ts`. `StaleClaim` appears in `packages/infra/checks/src/lib/liveness-signals-verdict.ts`, but that is a substring of the identifier `decideStaleClaimReleases` rather than a reference to the type — the file neither imports nor names the module.

Nothing matching `boot-digest`, `bootDigest` or `boot_digest` stands anywhere under `packages/`. The persona boot digest that consumed this classifier was removed by #19376 on 2026-08-17.

Until #19392 the one non-test file naming the module was `packages/infra/checks/src/lib/work-surfacing-surfaces.ts`, which declared it as the surface `persona boot digest owner classifier`. That entry was a data declaration rather than an import, and it was removed with the declaration floor moved 7 to 6.

`domains/repos/code-repo.md` states as intent that the code repo contains no unused code. `ops audit ast-unused` is the reading that weighs this class; whether the module wants deleting or wants a caller is the question that reading exists to put to a person, and this finding does not answer it.
