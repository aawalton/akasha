---
id: 00f50512-01ef-57aa-a465-5848934efbe7
page-type-slug: finding
title: "Entry globs root whole src"
domain-slug: domain/global
---

# Claim

`check-ast-unused` cannot report an unused export across most of the repo. Its config declares a whole-`src` entry glob in 136 of 178 configured workspaces, which makes every source file a reachability root there, and 201 further workspaces sit in `pendingCuration` with no config at all. The 77 workspaces naming `**/*.test.ts` as an entry are the smaller half of this: in 70 of them a whole-`src` glob already roots everything, so the test glob is what makes tests roots in only 7.

# Evidence

Measured 2026-08-09 on `~/code` at main, reading `ast-unused.config.json` directly, while deciding a proposed instruction that this blindness was the warrant for.

The config holds `workspaces` (178), `pendingCuration` (201), `outOfScope` (3) and an empty `ignoreWorkspaces`. The commonest workspace entry is `{"entry": ["src/**/*.ts", "**/*.test.ts"], "project": ["**/*.ts"]}`, which stands in 64 workspaces; `["src/**/*.ts"]` alone stands in 53. Counting any entry glob that names a whole source tree — `src/**/*.ts`, `**/*.ts`, `src/**/*.{ts,tsx}`, `src/**/*.tsx`, `src/**/*.ts!` — gives 136 of 178.

An entry glob is a reachability root, so where one names the whole of `src` no export under `src` can be unreachable. In those 136 workspaces the check's own question cannot return a positive answer.

The seven workspaces where the test glob is the only thing rooting test files: `alanwalton/atlas/web`, `infra/checks`, `infra/tests`, `shared/supabase/migrations`, `temper/scripts`, `temper/shared/build-deploy/checks`, `temper/web`.

The hypothesis this is filed under, Alan's, 2026-08-09: a test file should not be a reachability root. An export that only its own sibling test consumes is reachable today and reports as used, so widening a module's public surface to reach a private helper from a test leaves every instrument green.

What that argues the tooling should aim at, rather than an agent instruction: a repaired check would report an export whose only consumer is a test, and the repair it should invite is extracting the helper into a module of its own rather than widening the surface it was reached through. Without the second half the report reads as "leave it untested".

Not established: why the whole-`src` entry globs were declared, whether they were a curation shortcut or a deliberate scope, and what would go red on removing them. The 201 `pendingCuration` workspaces were not examined here.
