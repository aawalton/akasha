---
id: c72b4231-a580-5bfc-bbd6-547393cc70ce
slug: property-declares-a-key-no-file-can-hold
page-type-slug: finding
title: "One property document declares a key no file page can hold or read back"
domain-slug: domain/pages-system
---

# Claim

`properties/temper-net-worth-snapshot-user-id.md` declares `key: userId`, and that key can never be written to a file page nor read back from one. The write seam drops it before anything reaches disk, and the read seam substitutes the row's own column for it. The document describes a property no file can hold.

# Evidence

Run on 2026-08-20 against the working tree, not read.

`fileValuesOf("write", "temper-net-worth-snapshot", { userId: "u", totalValue: 5 })` returns `{"total-value":5}`. The `userId` key is gone: `SETTLED_ELSEWHERE` in `packages/shared/pages/access/src/file-write.ts:110` holds `pageTypeSlug`, `pageTypeId` and `userId`, and `fileValuesOf` skips every key in it.

On the read side, `SETTLED_BY_ROW` in `packages/shared/pages/access/src/file-rows.ts:26` holds `userId, pageTypeId, pageTypeSlug, seq, createdAt, updatedAt, deletedAt`, and `buildRawPageRows` does `continue` on each, so a `userId` stated in a file never reaches `attributes`. Every file page reads back as the universal user instead: a `temper-task` page read through `collectPages` gives `userId: "ffffffff-ffff-ffff-ffff-ffffffffffff"` while its file states none.

The two sets disagree about spelling in a way worth noting beside this: the write seam kebabizes first, and `kebabizeKey("userId")` is `user-id`, yet `SETTLED_ELSEWHERE` is tested against the raw key before that conversion. So `userId` is dropped and `user-id` would not be.

`temper-net-worth-snapshot` holds 3,246 rows, counted through the page query service. Its pages live in a `data: jsonl` sidecar under `temper-net-worth-day.snapshots` rather than in `.md` files, so nothing writes this key through the seam today and the fault is latent rather than bleeding.

# Re-check

Checked again 2026-08-27 at HEAD. The claim holds; two particulars of the evidence above do not, and are false rather than merely old.

The spelling paragraph is repaired and no longer describes the code. `fileValuesOf` now asks `SETTLED_ELSEWHERE.has(camelizeKey(rawKey))`, the way the read seam has always asked it, so `userId` and `user-id` are dropped alike and a key the row settles cannot be made writable by respelling it. The seams live at `shared/pages-access/src/file-write-values.ts` and `shared/pages-access/src/file-rows.ts` since the consolidation, not under `packages/`.

`SETTLED_BY_ROW` holds four keys, not the seven read here: `userId`, `pageTypeId`, `pageTypeSlug`, `seq`. `createdAt`, `updatedAt` and `deletedAt` do reach `attributes` now, so anyone acting on that sentence would be sent at a gap already shut.

What stays open is the claim itself. `userId` still cannot be held on a file page — with the spellings unified it is dropped under both — so `pages/page-property-definition/temper-net-worth-snapshot-user-id.page-property-definition.md` still declares a `required: true` property no file can carry. The drop is deliberate and pinned by `shared/pages-access/src/file-write.unit.test.ts:75`, so the artifact at fault is the declaration rather than the seam. Removing it means deleting a page carrying a Definition line that readers inherit, which is Alan's to rule on.
