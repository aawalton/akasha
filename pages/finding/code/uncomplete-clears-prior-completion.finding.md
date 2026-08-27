---
id: 52119145-d270-54b3-bfad-ddc0079c63c0
page-type-slug: finding
title: "Uncomplete clears prior completion"
domain-slug: domain/global
---

# Claim

Uncompleting a task that has earlier completions leaves `lastCompletedAt` null, so the row stops recording that the task was ever completed before. The two live inverse automations clear the field unconditionally rather than rolling it back to the next-most-recent snapshot, and `ops page uncomplete` reports success, so the loss leaves no trace at the moment it happens.

# Evidence

Both inverse rules are live and enabled, read with `ops page show <id> --properties trigger,actions`: `019ddedb-6d48-7f89-bc8e-1f06d2da5f52` (page-type `task`) and `019ddedb-7e30-7561-974f-be948f06e36a` (page-type `temper-task`). Each fires on a `*-completed-task` snapshot's `deletedAt` going empty to non-empty, and each runs `patch_relation` on `taskPageId` with `set: { completedAt: null, lastCompletedAt: null, dueDate: "= source.dueDate" }`. The `lastCompletedAt: null` is a literal, not an expression.

The strictly-correct restoration would set `lastCompletedAt` to the next-most-recent snapshot's `completedAt`, which the expression language cannot express. `resolveValueExpr` at `packages/automation/core/src/pure/value-resolve.ts:49-72` evaluates a formula against a scope built at lines 62-64 as `{ source, referrer?, match? }`, optionally with relation properties substituted by the cross-page pre-resolver. Every binding names one already-known row; nothing selects or orders sibling rows, so no formula can reach the next-most-recent snapshot.

`ops page uncomplete --help` describes the behaviour as correct — "`completedAt` / `lastCompletedAt` are cleared, and `dueDate` is restored to its pre-completion value" — with no caveat, and the verb reports `no-completion` only when there is no snapshot at all. A caller uncompleting the newest of several snapshots gets the same success output as one uncompleting the only snapshot.

Nothing in either repo carries this. No seed script creates these two rows: `rg -uuu` over `~/code` returns no tracked file holding either UUID, and no gate covers it (`ops enforcement list`, 242 mechanisms). The observation was recorded only in `packages/automation/orchestrator/docs/seeded-automations/snapshot-restore.md`, which is quarantined and being deleted, which is why it is filed here.
