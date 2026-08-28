---
id: 5c087182-7c64-5bb8-91ed-adab295893c6
slug: template-parent-unreachable-from-seeding
page-type-slug: finding
title: "Template parent unreachable from seeding"
domain-slug: domain/collections
---

# Claim

The seeding surface every collections package uses cannot express a page type's parent, so a type declining `collection-template` is not merely unnoticed — it is unaskable at the point of creation. `PageTypeSpec` in `packages/shared/utils/sync/src/ensure-page-types.ts` has four fields, `slug`, `title`, `pluralSlug` and `icon`, and no parent among them. `extendsPageTypeId` appears in no file under `packages/collections/` at all.

# Evidence

Read live in `~/code` on `main`, while ingesting `dirty/skills/collections/rulings.md`.

`packages/shared/utils/sync/src/ensure-page-types.ts:64-69` declares the whole of `PageTypeSpec`: `slug`, `title`, `pluralSlug`, `icon`. `extendsPageTypeId` appears nowhere in that file.

`rg -uuu -l "extendsPageTypeId" --glob '!*/dist/**' --glob '!*/build/**' packages/collections/` exits 1 — no file under `packages/collections/` names it. `rg -uuu -l "ensurePageTypes"` over the same tree returns 11 files. So every collections package seeds through the helper, and none reaches the key.

The key is settable, by another path: `packages/shared/pages/proc/src/page-type-create.ts` and `page-type-patch-by-id.ts`, over the SQL functions `page_type_create.sql` and `page_type_patch_by_id.sql`. Nothing links the two paths, so a parent is set out of band from the seeding a collection actually runs.

The two live departures seed exactly this way. `packages/collections/chess-puzzles/src/page-types/seed.ts:22-27` is `{ slug: "chess-puzzle", title: "Chess Puzzle", pluralSlug: "chess-puzzles", icon: "puzzle" }` and then declares its own `{ stringId: "solved", title: "Solved", type: "boolean" }` at line 54. `packages/collections/shows/src/page-types/seed.ts:23` is `{ slug: "movie", title: "Movie", pluralSlug: "movies", icon: "clapperboard" }`.

This adds to the standing `pages/finding/collections/template-departure-uncaught.finding.md`, which says "A type extending `page-type` directly is indistinguishable at creation from one that should extend the template." That is true, and this sharpens the "at creation" clause: the creation path has no field to be distinguished BY. An author seeding a new shelf is never presented with the choice, so declining the template takes no decision and leaves no trace of one.

Not judged: whether the fix belongs on `PageTypeSpec`, on the seeding helper, or elsewhere.
