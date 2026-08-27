---
id: a609876c-d0f8-5657-89f0-1cd807e2a853
slug: doc-citations-point-at-deleted-files
page-type-slug: finding
title: "Doc citations point at deleted files"
domain-slug: domain/code-quality
---

# Claim

Four live source files carry doc-comment citations naming two markdown documents that no longer exist anywhere in the repo, and every gate over them is green.

# Evidence

The two documents are `packages/temper/shared/addon-libraries/lib-sets/docs/preserved-upstream-bugs.md` and `packages/temper/player/completion/docs/measured-vs-unmeasured.md`. Neither exists. `find packages/temper -type d -name docs` returns nothing at all — there is no `docs/` directory anywhere under `packages/temper`. `git log --diff-filter=D` names the deletion: `7205e28efd`, "quarantine every instruction surface into the instructions repo".

The four citations that stayed behind:

- `packages/temper/shared/addon-libraries/lib-sets/src/core/api-set-type-checks.ts:185` — "`docs/preserved-upstream-bugs.md` before widening this return."
- `packages/temper/player/inventory-management/ui/src/net-worth-periods.ts:22` — names the absolute path.
- `packages/temper/player/completion/src/completion-card-progress-resolver.ts:23` — "(`docs/measured-vs-unmeasured.md` — absence is not a zero)".
- `packages/temper/player/completion/src/completion-card-progress-applicability.unit.test.ts:12` — "rather than scored — `undefined`. See `docs/measured-vs-unmeasured.md`."

What makes this worth recording is that the surviving prose is load-bearing: `api-set-type-checks.ts:185` tells an author to read a document before widening a return type, so the author who reaches it has a green light dressed as a gate.

I checked the two nearest-named gates and neither covers this: `check-md-imports.ts` validates import specifiers inside markdown code fences against the workspace package graph, and `check-source-position-citations.ts` refuses source-position citations written in markdown. Neither asks whether a `.md` path named in a TypeScript doc comment resolves. I did not read the other 228 checks, so this says nothing about whether some further gate does.
