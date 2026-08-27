---
id: 6f67bbaa-cc71-50df-9966-3b47c78acecf
slug: two-in-five-test-files-are-never-typechecked
page-type-slug: finding
title: "Two in five test files are never typechecked"
domain-slug: domain/code-quality
---

# Claim

109 of the 371 package `tsconfig.json` files in the code tree, now this repository, exclude test files from the compiler, so 1,005 of the repo's 2,555 test files — 39.3% — are never typechecked by anything. Genuine type errors have been standing in them, and nothing in the repo reports one.

# Evidence

Measured on this workstation on 2026-08-22, on branch `project-19447` off the code repo.

Every `tsconfig.json` under `packages/` was parsed (that tree now stands unprefixed at this repository's root) and its `exclude` array read. 109 carry a pattern matching `test`, most commonly `"exclude": ["**/*.test.ts"]`. 168 carry some other exclude that still leaves tests compiled, and 64 carry none. Counting `*.test.ts` and `*.test.tsx` inside the 109 gives 1,005 against 2,555 in the repo.

The exclusion is invisible in normal work, because the files still run: `bun test` executes them without consulting the compiler, so a test passes while carrying an expression that does not typecheck. Nothing reads green and nothing reads red — the compiler never opens the file.

Three surfaced in one afternoon, each caught only because the package was being copied into the instructions repo, whose write gate typechecks the whole change set rather than the package's own `tsconfig`:

`shared/pages-query/src/opened.unit.test.ts:56` — TS2769. `openedRows` declared `(rows: readonly Row[]): readonly Row[]`, while the `openedValues` it calls widens every value to `unknown`. The signature was unsound and the test asserting the widening could not compile against it. Both repos now carry the corrected return type.

`packages/infra/workflow-dsl/src/dsl/templates/source-sync-supervisor.unit.test.ts:27` — TS2769. `toContain(step.image)` against an array that collapses to three string literals because `IMAGES` is `as const`, while `Step.image` is plain `string`.

`packages/shared/supabase/server/src/service-role.smoke.test.ts` — references a `pages` table absent from the generated `Database` type.

The population is only the packages a migration happened to touch. Nothing has compiled the other 1,000-odd excluded test files, so the count of errors standing in them is unknown rather than zero.
