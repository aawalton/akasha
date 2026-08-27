---
id: 696e141a-f4d4-5fea-90df-f8cca81b28e9
slug: phantom-patch-variant-comment
page-type-slug: finding
title: "Phantom patch variant comment"
domain-slug: domain/pages-system
---

# Claim

A comment in `packages/shared/pages/proc/src/_enforce_page_schema.ts` names a procedure that does not exist. Line 40 lists the single-row patch variants the schema guard covers as `page_patch_by_id`, `page_patch_by_id_if_status` and `page_patch_by_seq_if_unclaimed`, and the third of those is not defined anywhere in the repository. The live third variant is `page_patch_by_seq`.

# Evidence

`grep -rn "page_patch_by_seq_if_unclaimed" --include=*.ts --include=*.sql --include=*.json .` across the whole repository, excluding `node_modules` and `dist`, returns exactly one line: the comment itself at `packages/shared/pages/proc/src/_enforce_page_schema.ts:40`. There is no proc file, no RPC call site and no entry in the generated database types.

`ls packages/shared/pages/proc/src/ | grep '^page-patch'` lists `page-patch.ts`, `page-patch-by-id.ts`, `page-patch-by-id-if-status.ts` and `page-patch-by-seq.ts` — three single-row variants and the multi-row parent.

A second comment in the same package contradicts the first. `_enforce_content_storage.ts:42` names "the three generic single-row patch variants (`page_patch_by_id`, `page_patch_by_seq`, `page_patch_by_id_if_status`)", which matches the tree.

What the disagreement costs is not the name. Both comments are enumerating which procedures a guard runs behind, and a reader checking coverage against the wrong list can conclude a variant is guarded when the guard has no such call site — or, reading the other way, that a variant exists to be guarded at all. `packages/shared/pages/access/src/where-fast-path.ts` routes a sole `seq`-equality `where` to `page_patch_by_seq`, so that is the name the coverage question is actually about.

Found ingesting `dirty/knowledge/pages-write-boundary-guards.md`, which carried the phantom name into its own enumeration of four patch variants — evidence that the stale comment has already been read as authoritative at least once.
