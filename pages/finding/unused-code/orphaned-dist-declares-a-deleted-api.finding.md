---
id: 4980be62-260e-5d1d-bf17-d1479c2c8033
page-type-slug: finding
title: "A package's orphaned dist declares an API for 324 deleted files and 94 live ones that no longer export it, and nothing in the repository imports any of it"
slug: orphaned-dist-declares-a-deleted-api
domain-slug: domain/unused-code
---

# Claim

`shared/status-bar-access/dist/` holds 3,297 generated `.d.ts` files that no import in this repository reaches and no build refreshes. They are untracked and not gitignored, so a search over tracked files misses them while a search over paths lands in them. They mirror the whole repository tree, so a reader looking for a module's surface finds a declaration file at exactly the path they expected, and reads a surface that is up to two generations old.

`pages/domain/unused-code.domain.md:15` states as Intent that nothing stands in akasha that nothing deployed reaches. This does.

# Evidence

Measured 2026-08-27 on the workstation checkout at commit `6d758cc32`.

Outside `node_modules`, 5,514 untracked and non-ignored `.d.ts` files stand in the tree; 5,255 of them are under a `dist/`. The largest roots are `shared/status-bar-access/dist` at 3,297, `infra/cluster-checks/dist` at 295 and `shared/pages-access/dist` at 286, across twelve packages.

Of the 3,297 under `shared/status-bar-access/dist`, 324 mirror a source `.ts` that no longer exists at any path. Of the 2,973 whose source does still exist, 94 declare at least one name that source no longer exports.

Nothing reads them. `shared/status-bar-access/package.json` maps `exports` to `"./*": "./src/*.ts"`, so `dist/` is not the package's surface, and a search for `status-bar-access/dist` outside `dist/` and `node_modules/` returns no hit.

The sharpest instance is the one that surfaced this. `shared/status-bar-access/dist/page/page-seq.d.ts`, last written 11:22:12, declares `SeqSource`, `comparePageSeq`, `readNextSeqOf`, `statesNextSeq` and `takeSeqOf`. `page/page-seq.ts`, last written 21:55:27 the same day, exports `comparePageSeq` and nothing else — commits `3f4e32f3a` and `3282f72ed` took the allocator out. The declared `SeqSource` still carries `instructionsRoot`, a field from before the pages moved into akasha, so that one file is stale against two separate changes.

It has already misled a survey. `pages/initiative/astra-pages-system-core.initiative.md:27` records, from different work, that `store.d.ts` declares `marksOver` and `emptyIndex` which "have no implementation at all", and concludes that "the `.d.ts` files are stale artifacts rather than the API, so a survey that reads them overstates what has to be replaced". `shared/status-bar-access/dist/page/index/store/store.d.ts` is one of the 94 this scan found independently.

NOT measured. Drift in the other eleven `dist` roots: the 324 and the 94 are counted for `shared/status-bar-access` alone. Whether any build script still regenerates these, and what last wrote them. Whether the two other stale-artifact reports made the same night — one that made `tools/` look typechecked, one that made a barrel look covered — are this same orphaned output or a different mechanism; both were reported to me rather than measured by me.
