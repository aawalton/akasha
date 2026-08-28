---
id: 1f038c2a-e2a5-5459-9d83-8f1b4b732d79
slug: completion-markers-unfilled
page-type-slug: finding
title: "Completion markers unfilled"
domain-slug: domain/collections
---

# Claim

Inside the `collection-template` family the completion vocabulary is declared everywhere and filled unevenly. `episode` and `car-trim` carry no `progress`, `status` or `completedAt` on any row — 1,250 rows with no readable position — and `song` carries `progress` on all 1,656 rows and the other two on none. No instrument would notice: the undeclared-attributes audit runs one direction only, catching a key no definition declares, so a declared property nothing ever writes reads as one merely unused.

# Evidence

Measured live on 2026-08-07 against production, over non-deleted rows. Columns are
rows / `progress` / `status` / `completedAt`:

    story-chapter  10,448   7,206   9,832   7,182
    collection      6,104   6,101   6,101   2,781
    song            1,656   1,656       0       0
    book            1,573   1,573   1,573     550
    car-trim        1,103       0       0       0
    great-course    1,095   1,095   1,095     488
    episode           147       0       0       0

`episode` and `car-trim` are at absolute zero across all three markers. `song` is the
partial case: every row carries `progress`, none carries `status` or `completedAt`, so
1,656 performances are recorded somewhere the shared vocabulary cannot read.

The blind spot is structural rather than an oversight.
`packages/shared/pages/proc/src/_page_undeclared_attributes.audit.sql` states its own
direction in its header: for every page type it diffs the attribute keys present in live
row data against the type's materialised `propertyDefinitions` blob, and reports keys with
no backing definition. That is declared-versus-present in one direction only. The write
boundary `_enforce_declared_attributes` refuses the same case — a key nothing declares.
Neither runs the other way, and `rg --multiline` over `packages/infra/checks/src` for
`propertyDefinitions` and `unmaterialized` returns nothing, so no check reports a declared
property that no row carries.

Raised by an archivist seat emptying `dirty/skills/collections/findings.md`, whose
2026-07-30 table has drifted in four of its seven rows and whose named cause, the anime
automation `Episode Completion Fill`, is live and `enabled` among those 13 rows
(re-measured 2026-08-07). The zeros survived, and are what a correct enabled
reactor looks like when nothing writes its trigger. That file is queued for removal.

Not judged: whether the repair is a writer at the moment work happens, a check for
declared-and-never-written properties, or dropping the markers on these two types.
