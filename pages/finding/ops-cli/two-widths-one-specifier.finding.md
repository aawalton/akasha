---
id: acb49d34-424e-5f83-893c-0f5a9de560ec
slug: two-widths-one-specifier
page-type-slug: finding
title: "Two widths one specifier"
domain-slug: domain/ops-cli
---

# Claim

Two lib files in the `temper` tree declare `@temper/game-items-core/classify-item-node-ids` and `@temper/game-items-core/inventory-parser`, and the two declarations are deliberately different widths rather than a duplication to consolidate.

# Evidence

`tools/lib/temper-inventory-plan-code.ts` declares `InventoryDatabase = object` and `classifyItemToNodeIds: (item: unknown) => readonly string[]`. Its verbs — `plan`, `capacity-audit`, `parity` — hand the parsed database straight to the plan pipeline and never walk it, so an opaque type is everything they read.

`tools/lib/temper-explain-code.ts` declares the same two specifiers with `locations → bags → items`, carrying `lastScanned` and the seven TTC fields. `explain` walks the database slot by slot and lifts the pricing off the matched row, so the structure is what it reads.

Neither view can serve the other. `object` cannot be walked; the explain shape would put that walk's structure in a module whose verbs never touch it. `tools/lib/code-import.ts` asks for exactly this — the caller declares the shape, and declares only what it reads — so two minimal views of one module are that instruction obeyed.

This is filed because it resembles a duplication the fleet was warned about the same night, and does not share its mechanism. That one was one module under two SPECIFIER SPELLINGS — `@shared/supabase-server` beside `packages/shared/supabase/server/src/index.ts` — where a reader meeting both has nothing to say which is canonical. Here the specifier is identical in both files and only the declared width differs, so the original is unambiguous and neither declaration can go stale against the other without failing to compile at its own call.

Two seats settled this between them while both sets stood proved, rather than re-pointing either and re-deriving the proofs behind it.
