---
id: ed9de695-eb21-5691-bf62-68f38ac1fa1b
slug: show-by-seq-cannot-name-a-file-page
page-type-slug: finding
title: "Show by seq can name no page on a file-backed type, and what it says when it fails is wrong"
domain-slug: domain/ops-cli
---

# Claim

Every entity surface in the repository offers `show --seq <n>`, and on a file-backed page type
no `<n>` can name a page. The failure is loud, which is the good half; what it says is wrong,
which is the half worth knowing. Measured 2026-08-20 by running the command.

# Evidence

Fourteen surfaces are configured across four packages: three under
`packages/alanwalton/daily-tracking-cli`, eight under `packages/collections/exercises`, one
under `packages/collections/food`, and two under `packages/temper/player`. Each gets its `show`
from `makeShowModule`, and `--seq` is a required flag on all of them. Six further configs under
`packages/shared/pages/cli` are test fixtures.

`runEntityShow` at `show.ts:44` asks `getPage` with `where: [{key:"seq", eq: seq}]`. On a
file-backed type every page reads back as seq 0, so:

    exercise show --seq 1    DataError:        exercise #1 not found
    food     show --seq 42   DataError:        food #42 not found
    exercise show --seq 0    OperationalError: getFilePage(exercise): expected at most one page, got 2

Both `exercise` and `food` are on the file-backed roster and both hold pages. "Not found" names
a page that is standing; what is missing is the address, not the page. A reader given that
sentence goes looking for a deleted page.

Two corrections to how this was drafted. It is **not** `getEntityBySeq` that backs the command --
that function, at `update.ts:35`, is exported and has **no caller anywhere in the
repository**. `runEntityShow` does its own `getPage`. And the surfaces do **not** silently return
nothing: `show.ts:49` raises a `DataError` and the help declares exit 2 for it, so a script sees
a non-zero exit rather than an empty answer.

The sibling that writes is worth naming beside this. `patchEntityBySeq` at `update.ts:47`
addresses by the same narrow, and the write seam now refuses a `seq` narrow outright, so it
raises rather than patching everything. The read command has no such refusal.
