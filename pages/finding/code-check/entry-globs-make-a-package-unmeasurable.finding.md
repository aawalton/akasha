---
id: 9b6d5666-2b20-50ef-9696-80b64251e56f
page-type-slug: finding
title: "Entry globs make a package unmeasurable"
domain-slug: domain/global
---

# Claim

`ast-unused.config.json` gives `packages/infra/scripts` the entry globs `src/**/*.ts` and `migrations/**/*.ts`, so every source file in the package is an entry point and no file in it can ever be reported unused. `schemas.ts` sits there dead behind that, reached only by its own test.

# Evidence

Read 2026-08-07 at `~/code` HEAD `d01942409a`.

The entry at `ast-unused.config.json:880` is:

    "packages/infra/scripts": {
      "entry": ["src/**/*.ts", "migrations/**/*.ts"],
      "project": ["**/*.ts"]
    }

`project` and `entry` cover the same set, so reachability from an entry point is satisfied by every file trivially. The package is declared rather than skipped, which is what makes this different from an undeclared population — it reads as covered on every report.

The live victim found while ingesting a quarantined document about the docs validator: `packages/infra/scripts/src/docs-validator/schemas.ts` exports `FIELD_SCHEMAS` and `validateFrontmatter`, and `grep` across `packages/` finds them referenced only in `schemas.unit.test.ts`. The sole consumer was `validate.ts`, removed in `c80da2ba61` on 2026-08-04. That commit ran an import closure over `@agents/instructions` and pruned 24 orphans there, but nothing reported the orphan it left in `@infra/scripts` — because nothing there can be reported.

A test-only export is the exact shape this check exists to catch, and it went unremarked through a commit whose whole subject was removing what the deleted code alone kept alive.

Two more of the same kind sit beside it, unmeasured for the same reason: `FIELD_SCHEMAS` still carries `docs` and `claude` entries for a corpus with no docs pages in it — `git ls-files '*.md'` returns 26 files, none at a path containing `docs`.
