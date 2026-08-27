---
id: a1104003-26d9-5587-a2be-6967187d2c1c
page-type-slug: finding
title: "Seed page type specs moved leaving unused exports"
domain-slug: domain/ops-cli
---

# Claim

The three `seed-page-type` verbs carried their page-type and property-definition SPECS in the code repository's CLI file, so moving each body moved that data here — and left an exported `ensure*PageType` wrapper standing over there that nothing now calls.

# Evidence

Found 2026-08-13 by the seat moving the `misc-b` bodies.

`packages/shared/person-enrolment/cli/src/person/seed-page-type.ts`, `packages/shared/person-authority/cli/src/person-authority/seed-page-type.ts` and `packages/shared/person-access/cli/src/person-access/seed-page-type.ts` each declared a `PAGE_TYPES` array and a `PROPS` record beside the handler, and each exported a one-line `ensure*PageType(sb)` that passed them to `ensurePageTypes`. A grep across the code repository found no consumer of any of the three exports outside its own file; the only other hits were the generated `dist/**/*.d.ts`.

So the specs are what parses and prints — literal data the verb hands a capability — and they moved. `ensurePageTypes` reaches the store and stayed. The three exports were not removed, because nothing in the code repository is edited on this path; they now stand unreferenced.

That the moved specs are right was measured rather than assumed: each verb ran against the live store and reported `existing=7`, `existing=3` and `existing=4` respectively, which is every property matching a standing definition by `stringId`. A spec that had drifted would have reported a create.

Which client each reaches was checked per verb and matched: all three pre-move bodies called `getPageAccessClient()`, the memoized one, and the moved bodies call `pageAccessClient()` from `tools/lib/pages-access.ts`, which resolves that same function.
