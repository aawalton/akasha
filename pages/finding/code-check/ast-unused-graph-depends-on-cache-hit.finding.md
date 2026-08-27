---
id: 3a8a1b8b-8549-5588-8c1f-9282fd874c43
slug: ast-unused-graph-depends-on-cache-hit
page-type-slug: finding
title: "Ast unused graph depends on cache hit"
domain-slug: domain/global
---

# Claim

`check-ast-unused` reasons over two differently-built graphs depending on whether the cache answered, and they disagree about which workspace owns a nested package's files. `getOrBuildGraph` ignores the `BuildContext` it is handed on a cache hit, returning a graph built with no `workspaceGlobs`; on a miss it builds with the curated ones. Files under 17 uncurated nested workspaces are in the graph on one path and dropped on the other, and CI takes the cached one.

# Evidence

Measured in `~/code` at `383bf60d35c15cd5d10cd07f39ac33ffb38e2bfa`.

`buildGraphFromProducer` (`lib/ast-unused-build-graph.ts:61`) builds a `workspaceGlobs` map from the curated `ast-unused.config.json#workspaces` and passes it both in the `BuildContext` and in the fallback's `engine.build`. `getOrBuildGraph` takes that context as `_ctx` and never reads it: on a 40-hex `treeSha` with a present cache file it returns `readCachedGraph` and nothing else. The cached graph is written by `check-build-graph.ts:95`, `buildFullGraph({ workspaceRoot: repoRoot })` — no `workspaceGlobs`. Its own docblock puts CI on the cached path and local dev on the fallback.

The two attributions meet one consumer filter, `wsByRoot.get(attrs.workspaceRoot)` at line 114, with `if (ws === undefined) continue`, and fall opposite ways.

Enumerating the config's 174 curated roots against the 379 workspaces the root `package.json` declares, 17 are uncurated and sit inside a curated parent: the six `capture/*` packages under `temper/game/characters` and `temper/game/completion`, `awen`'s `core`, `engine` and `ingest`, `infra/k8s/postgres/annual-dump` and `gfs-promoter`, `agents/pacing/core`, `automation/orchestrator/cli`, `collections/music/spotify`, `infra/ci/merge-queue/coordinator/cli`, and `temper/player/completion/cli` and `index-store`.

The root set differs too, not only membership: `packages/infra/k8s` is curated with entry globs including `**/synth.ts`, and both `postgres/annual-dump/k8s/synth.ts` and `postgres/gfs-promoter/k8s/synth.ts` exist under it while neither package is curated.

It was seen once and patched one axis short. Line 131 carries an explicit recovery for `discoveredVia` differing between the builds, on the stated ground that "under the universal cache the producer has no curated entry globs". There is no such recovery for `workspaceRoot` differing.
