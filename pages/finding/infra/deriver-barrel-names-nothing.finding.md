---
id: 6154784f-bc79-55f7-b178-21a6b32897dd
slug: deriver-barrel-names-nothing
page-type-slug: finding
title: "Deriver barrel names nothing"
domain-slug: domain/global
---

# Claim

The `check-deriver-barrel` command names a file that stands nowhere, so it fails only when somebody runs it.

# Evidence

First read on 2026-08-14 from a `code-paths-resolve` failure — 1107 paths named into the code repository, 2 standing nowhere, both named by `tools/commands/check-deriver-barrel.ts`.

Re-measured 2026-08-27 in `/var/home/walton/repos/akasha`, where there is no `packages/` directory and `code-paths-resolve` is no longer a registered check. One of the two names now resolves: line 13 imports `generateBarrel` from `../../infra/cluster-checks/src/lib/generate-deriver-barrel.ts`, and that file stands. The other does not. Line 35 reads:

    const BARREL_REL_PATH = "packages/infra/checks/src/derivers.generated.ts"

Nothing is at that path, and `infra/cluster-checks/src/` holds no `*.generated.ts` at all.

Run rather than read: `ops check-deriver-barrel --repo-root /var/home/walton/repos/akasha` exits 2, printing "EMPTY POPULATION — 0 deriver files: this run examined nothing, so it certifies nothing" alongside one violation against `packages/infra/checks/src/derivers.generated.ts`. Whether the command should follow the move or go entirely is not settled here.
