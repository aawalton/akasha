---
id: 95e02280-7996-56b1-b2ee-bd00a60d0cca
page-type-slug: finding
title: "Test only reach credits dead module"
domain-slug: domain/global
---

# Claim

A module reached only from its own unit test is credited as reached, so dead code keeps a test as its sole caller and the check stays green over it.

# Evidence

Read on 2026-08-16 while clearing the six unused exports in `packages/alanwalton/awen/src/awen/gm-migrate-tower-build.ts`.

That file and `packages/alanwalton/awen/src/awen/gm-source-parse.ts` were both left behind when the `awen gm-migrate-tower` command was retired; `tools/commands-retired.txt:37` records the retirement and says nothing is left to migrate. `gm-source-parse.ts` is 69 lines exporting `MdSection`, `extractH1`, `splitH2Sections`, `findSection`, `bandLines` and `slugId`.

`git grep` shows exactly two importers of `gm-source-parse.ts`: the file above, and `gm-source-parse.unit.test.ts` beside it.

Deleting `gm-migrate-tower-build.ts` alone takes the check from six violations to `zero unused exports` over 13336 modules and 12281 entry files. `gm-source-parse.ts` now has no caller but its own test, and the check reports nothing about it.

Two readings, and the check cannot tell them apart:

- A tested module with no production caller is dead, and the test is holding it up. Then the check is missing a whole class.
- A unit test is a legitimate entry, and a module proved by one earns its place whatever else calls it. Then this is the check working.

The same shape reaches every retired command that was split into a shell and a helper, because the helper is the half that carries the tests.

Nothing was deleted on this reading beyond the file the check named, so `gm-source-parse.ts` and its test still stand.
