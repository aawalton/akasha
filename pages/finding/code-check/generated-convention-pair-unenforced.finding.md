---
id: ec19885d-52f5-540d-a358-9c509cdd81da
page-type-slug: finding
title: "Generated convention pair unenforced"
domain-slug: domain/global
---

# Claim

The generated-code convention has two halves — the `*.generated.ts` suffix and a `generated/` directory for the file's home — and each is held by a check whose population the other never sees, so nothing enforces the pair. Both gates are green today with eight files violating one half or the other.

# Evidence

`check-generated-suffix` holds the naming half. Its entrypoint enumerates `**/*.ts` and `**/*.tsx` through `findFiles`, whose default exclude is `FILESYSTEM_WALK_EXEMPT_DIRS` in `packages/infra/checks/src/lib/file-finder.ts`, folding in `CHECK_EXEMPT_DIRS` — which carries `generated`. So it never enters a `generated/` directory, and it asks only whether a file carrying a provenance marker is named `*.generated.ts`.

`held-addon-structure` holds the placement half, and only for addons marked `state: "held"` in the territory map. Its third clause is that every `*.generated.ts(x)` lives under a `generated/` directory.

The two populations are disjoint: the first is defined by excluding what the second is mostly about. Nothing walks both.

Both directions fail in the tree today, with both checks green.

Of 165 tracked `*.generated.ts(x)` files, 7 sit outside any `generated/` directory, all in unheld territory that `held-addon-structure` never reaches:

- `packages/infra/checks/src/enrichers.generated.ts`
- `packages/infra/checks/src/producers.generated.ts`
- `packages/infra/k8s/prometheus/query-tail-baseline.generated.ts`
- `packages/alanwalton/projects/cli/src/lib/undeclared-attributes.baseline.generated.ts`
- `packages/temper/shared/build-deploy/checks/src/eso-base-game-globals.generated.ts`
- `packages/temper/shared/build-deploy/checks/src/eso-colon-methods.generated.ts`
- `packages/temper/shared/build-deploy/checks/src/tstl-colon-dot-self-shift.baseline.generated.ts`

The other direction: `packages/shared/supabase/database/src/generated/database.ts` is the Supabase schema snapshot, unsuffixed inside a `generated/` directory, and unscanned because the walk exempts that directory name.

Measured 2026-08-07 by simulating each check's walk over `git ls-files`, during the ingest of `dirty/knowledge/generated-code-convention.md`, whose reading this confirms. That source is now removed, so this is the only remaining record.
