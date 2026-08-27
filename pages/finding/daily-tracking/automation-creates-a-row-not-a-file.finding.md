---
id: 7929ad75-59a0-524d-8e5a-db815964b6ee
page-type-slug: finding
title: "The daily-tracking automation creates a row while every other writer creates a file"
domain-slug: page-type/daily-tracking
---

# Claim

`automations/daily-tracking-opened.md` opens Alan's day with a `create_page` action, and that action is the one daily-tracking writer that is not backing-aware: it inserts a row where every other writer lands a file. It is disabled rather than deleted. Repoint the create onto the backing-aware path before enabling it again, or establish that nothing needs a day opened ahead of its first writer and delete it.

# Evidence

Read and run on 2026-08-20. `runCreatePageAction` at `packages/automation/orchestrator/src/actions/create-page.ts:70` calls `db.createPagePg`, a raw Postgres insert. Against that, `patchPageById`, `createPage`, `getPages`, `delete` and `upsert` in `packages/shared/pages/access/src/` each open with `if (await isFileBacked(args.pageTypeSlug))`. Run against the live corpus, `isFileBacked("daily-tracking")` is true and `getPages` for 2026-08-19 answers `inboxTemperTasks = 4` where the row holds 0 — so the access layer already reads and writes files for this slug and the automation does not.

The damage is measured, not supposed. On 2026-08-20 the day was opened twice: a row carrying `01a01e9d-c734-7ea3-8be4-aefb8105a7ed` and a file carrying a freshly minted `01a01eea-3bde-7000-acc5-990a51d6d2b9`. Five persona-day pages named the row's id, which the file did not carry, and the file was corrected by hand in `8f642eebf`.

Nothing reports it while both halves stand: the page resolves by name and by date from either side, and only a join on the uuid disagrees.

The orchestrator runs under `worker-supervisor`, measured at 0/0 replicas, so this is inert until Alan restores it.
