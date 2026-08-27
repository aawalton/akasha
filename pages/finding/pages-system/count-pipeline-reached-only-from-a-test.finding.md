---
id: 41faa7a0-4b52-51cc-a392-bbddb47ee594
slug: count-pipeline-reached-only-from-a-test
page-type-slug: finding
title: "Count pipeline reached only from a test"
domain-slug: domain/pages-system
---

# Claim

A count-only read surface in the browser mirror is exported from no barrel and called from nothing but one unit test, while its own header argues it earns its place as the count-only entry point — the position nothing occupies, since a consumer takes the count off the result of the read it already made. Nothing reports it: the package's own entry globs make every file under `src/` a reachability root, so no export anywhere in it can be flagged dead.

# Evidence

Measured against `origin/main` at `1313565199` on 2026-08-07, from `/home/walton/code`.

`createCountPipeline` at `packages/shared/pages/ui-store/src/query/count.ts:28` wraps `createRegularPipeline` and hands back its `totalCount`, plus `subscribe` and `dispose` forwarded unchanged.

`packages/shared/pages/ui-store/src/index.ts` exports `createRegularPipeline`, `createViewPipeline` and `createIdSuffixPipeline`, and not this one. Its own head lists the read pipelines as those three.

`git grep -n createCountPipeline` over the whole repository returns three lines: the definition above, and `packages/shared/pages/ui-store/src/query/regular-pipeline.unit.test.ts:18` importing it and `:183` calling it. `CountPipeline`, the interface, has no consumer outside the same file.

The header at `count.ts:11-12` states the position it claims: "Kept minimal per Parsimony — it earns its place solely as the count-only entry point."

Why no instrument reports it. `packages/infra/checks/src/checks/check-ast-unused.ts:23` describes the algorithm as "BFS from entries honoring transit-node semantics; every export not reached and not suppressed by a pragma becomes a diagnostic", and `:19-22` names `entry` as "reachability root". `ast-unused.config.json:1089` gives `packages/shared/pages/ui-store` the entry globs `["src/**/*.ts", "**/*.test.ts"]`. Every file under `src/` is therefore a root, and an export on a root is reached by construction, so the check cannot flag any export in this package whatever its callers. The same `src/**/*.ts` entry glob appears 135 times across the 379 workspaces the config configures.

Whether the surface is deleted or wired to something is not this reading's to settle.
