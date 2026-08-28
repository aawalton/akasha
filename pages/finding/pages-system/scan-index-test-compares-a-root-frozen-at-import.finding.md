---
id: 1ce8c20d-3081-56c8-8b36-e494b70ec558
page-type-slug: finding
slug: scan-index-test-compares-a-root-frozen-at-import
title: "A page scan index test compares against a root frozen at import"
domain-slug: domain/pages-system
---

# Claim

Which source a page scan reads is an exact comparison against a root frozen into the process at import, rather than a test of whether the root it was handed has an index.

# Evidence

Measured 2026-08-28 at `8c1650a7`, on Bun 1.3.14 and Node 24.3.0.

`page/index/store/store.ts:219-220`:

    export function indexReaches(repo: string, root: string): boolean {
      return canonicalize(rootBeside(repo)) === canonicalize(root)
    }

`scannedFromIndex` at `page/index/scan/scan.ts:43` returns `null` unless that holds, and `scanIn` at `page/page-types.ts:105-106` takes the index answer only when it is not null.

`rootBeside` at `repo/roots/roots.ts:104-107` answers `HERE` for akasha, and `HERE` at `:38` is a module-level const evaluated once when the module loads. Measured:

    AKASHA_ROOT at import : /var/home/walton/repos/akasha
    HERE                  : /var/home/walton/repos/akasha
    indexReaches("akasha", HERE)                             true
    indexReaches("akasha", "/var/tmp/suite-trees/x/repo")     false
    ...then setting process.env.AKASHA_ROOT to that worktree:
    rootBeside("akasha")  : /var/home/walton/repos/akasha    (unmoved)
    indexReaches("akasha", "/var/tmp/suite-trees/x/repo")     false

In the suite tree `AKASHA_ROOT` is the live checkout, so a scan taking `resolveRoots()` presents the live checkout and the index does answer; what falls through is a caller presenting a different root — `tools/lib/subjects.unit.test.ts:8` takes `new URL("../../", import.meta.url)`, which inside the worktree is the worktree, and passes it as `akasha`. Why `AKASHA_ROOT` is the live checkout inside a pinned tree stands as `pages/finding/checks-system/pinned-files-live-roots.finding.md`.

This is not the value `pages/finding/pages-index/fixtures-read-the-live-index-not-their-own.finding.md` reports. That one is the `held` binding in `indexRoot()` at `page/index/place/place.ts:50`, frozen at first call; this one is `HERE` at `repo/roots/roots.ts:38`, frozen at import, in a different module. `indexReaches` reaches `HERE` through `rootBeside` and never calls `indexRoot()`, so keying `indexRoot` by its root does not touch this branch.
