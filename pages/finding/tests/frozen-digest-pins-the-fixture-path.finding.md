---
id: 9bab0531-43cf-57f4-aebc-e0ef70504979
page-type-slug: finding
title: "Frozen digest pins the fixture path"
domain-slug: domain/global
---

# Claim

The spawn fixture's shared path cannot be made unique per run, because `interactive-spawn-recording.test.ts` pins a frozen digest over rows carrying that path in absolute form. A pid in the root changes the hash every run, so the test cannot pass rather than merely needing a new constant. The repair is the digest's subject, or the rm and mkdir that straddle a tree another process may remove.

# Evidence

Measured on 2026-08-14, after the obvious repair was tried and reverted at `814ff00a3`.

Putting `process.pid` into `ROOT` and `SPAWN_ROOT` in `tools/tests/interactive-spawn-plugins.ts` typechecks, lands, and fails two tests deterministically on a single run:

```
(fail) answers the digest the standing implementation answered
-   "9e8a1e107b601bfe6e38f82c684fb11b4673d777d7d594e5a2c3b94980dca2e7"
+   "16b96ad23d9fb9f5fc0f3f0d3fd5fac781302f452c82f3daf6f97fa89a40e613"
```

`FROZEN` at line 120 is a constant, and `digestOf(resultFor(zone).rows)` hashes rows holding the fixture's install directories as absolute paths. The digest is stable only while the path is fixed, and fixed is exactly what lets two concurrent runs delete each other's fixtures.

Two repairs are open and neither is a path swap.

The digest could stop hashing an absolute fixture path. `domains/file-kinds/tests.md` Properties reads on this as the defect rather than the constraint: the assertion pins a detail of the input at hand rather than an invariant over every input the code admits.

Or the removal and the creation could stop straddling a tree another process may remove. Line 232 is `rmSync(ROOT, {recursive: true, force: true})` and line 233 `mkdirSync(registryDir, {recursive: true})` beneath it; a recursive mkdir whose parent goes between the two returns ENOENT.

The cost while it stands: two failures in ten full runs, both while a second run was live; six serial runs alone all passed.
