---
id: df792a28-bc44-5993-812f-d0103c6edb43
page-type-slug: finding
title: "Sargable cast unread on the right of the operator"
domain-slug: domain/global
---

# Claim

`check-sargable-pages-predicates` reads a cast only where it stands ahead of the comparison operator, so the same index-defeating cast written on the right of the operator passes clean, and closing that gap needs a scanner that can tell what a name refers to.

# Evidence

Found by #18653 while widening the check to every SPELLING of the cast, and re-measured by the parent of tree #18682 on branch `project-18682`.

A column-side cast — `pages.id::text = p_id` — rewrites every row before comparison, so postgres cannot serve the predicate from `pages_pkey`. Written the other way round, `k.parent_key = p.id::text`, it defeats the same index identically. The landed matcher requires a comparison operator to FOLLOW the cast, so only the first is refused.

The parent scanned the check's own four surfaces — pages proc, proc-compiler, access source, and the deployed function snapshots, 564 files — for a guarded column carrying a cast on the right of an operator. **Seven lines**, and reading each one they are all legitimate:

- `_page_assert_required_columns.audit.sql:84,87` and `load-steps-for-workflows.ts:28` — the correct parameter-side cast, where the bare indexed column is on the left.
- `page_type_hard_delete.sql:44` and `page_type_patch_by_id.sql:71` — a plpgsql record field and a jsonb extraction, neither a table column.
- `get_status_bar_snapshot.sql:114,187` — `k.parent_key = p.id::text`, THE ONE CARRYING A REAL PAGES COLUMN. Benign because the other side is a CTE with no btree to defeat, and it is the line showing that a genuine violation of this shape would pass.

So widening to operand order today would redden seven correct lines with no repair available to their authors, which is Zero At Landing failing rather than passing. The narrower landing was forced rather than chosen.

What would close it is a scanner that resolves a name to the relation it belongs to, which separates `p.id` where `p` is `pages` from `w.id` where `w` is a CTE. Pure text cannot make that call — and the two are spelled identically.

The gap is named in the check's success line, so every green run prints it. Nothing else carries it.
