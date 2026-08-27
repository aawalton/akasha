---
id: e511ec3b-2532-53f4-8b7e-51d97f1e8353
slug: graph-cache-never-covers-a-bare-ask
page-type-slug: finding
title: "Graph cache never covers a bare ask"
domain-slug: domain/global
---

# Claim

The universal graph cache serves no check that asks for a graph with a bare workspace root, which is every graph-consuming check but one, so each rebuilds a graph `preparation-build-graph` already built — after paying to read and discard the cached copy.

# Evidence

Reported by #18642 and re-measured by the parent of tree #18682 on branch `project-18682`.

`check-build-graph` writes its cache under `universalBuildContext({ workspaceRoot })`, and `cachedContextCovers` decides a hit. Its globs arm is `if (askedGlobs === undefined) return cached.workspaceGlobs === null`, so a bare ask is covered only by a cache carrying no globs at all.

The parent ran the real `check-build-graph` over the branch, then asked the cache file it wrote:

- the written context carries `workspaceGlobs` for **393** roots, never `null`, and `repoFiles: null`
- a bare `{ workspaceRoot }` ask is **not covered** — every hit refused
- control: the writer's own globs, passed back, **are** covered, so the predicate is not broken generally
- second control: dropping ONE of the 393 roots makes it refuse, so the covered reading is discriminating rather than blindly true

The cause is dated. `c8d09a1d58` (2026-08-10) made the build merge `universalWorkspaceGlobs` into its context, and the recorded context is the one the build RAN under. Before that commit the two met.

SIZE, with the denominator stated. Of the 38 non-test check scripts referencing `getOrBuildGraph` or `buildFullGraph`, **37 mention no `workspaceGlobs` at all** and 1 does. How many of those 37 run as registered steps in a given pipeline is a smaller number the parent did not measure; #18642 put it at roughly fifteen.

The cost is paid twice per affected step. #18642 measured `check-image-tags` at 21.34 s against a populated cache and 21.47 s against none, peaking 149 MB HIGHER on the cache-present run — for a read whose result is discarded. The graph build itself is ~28 s and ~2 GiB peak.

The cache artifact is sound: `readCachedGraph` returns it and its context parses. What is wrong is the coverage test against the ask, not the data — which is why the two candidate repairs point opposite ways, one widening what is recorded and one narrowing what is asked.
