---
id: d6bef26d-e322-555c-93f4-b5ff75c9c43c
page-type-slug: finding
title: "No touch header states equality stamp"
domain-slug: domain/database
---

# Claim

`no-touch-keys.ts`, the declared single source of truth for the no-touch key registry, says `mark-ingested` stamps `loreIngestedAt = updatedAt` "for exact equality". The live writer stamps the millisecond CEILING of `updatedAt` instead. Equality is the design #15327 replaced: `loreIngestedAt` canonicalizes to millisecond precision while `updated_at` is a microsecond column, so an equality stamp lands below the column and every clean ingest reads stale.

# Evidence

Read in the code repo on `main` at `f835592986`, on 2026-08-08, while emptying `dirty/code/packages-alanwalton-awen-docs-loremaster.md`.

The comment. `packages/shared/pages/proc/src/no-touch-keys.ts:18-20`: "As a no-touch key the stamp holds `updated_at` fixed, so `mark-ingested` can stamp `loreIngestedAt = updatedAt` for exact equality — a clean ingest reads fresh". The same block is dated "(#15320/#15327)" at :10, so it was touched at the change that replaced what it describes.

The writer, read as the executable line rather than the comment above it. `packages/alanwalton/awen/src/awen/game-access-lore.ts:211` is `set: { loreIngestedAt: ceilInstantToMs(String(turn.updatedAt)) }`.

The verb agrees with the writer, not the comment. `ops awen mark-ingested --help`: "Sets `loreIngestedAt` to the ms-ceiling of the turn's current `updatedAt` ... the ms-ceiling clears the µs/ms precision gap so the mark reads fresh, not stale".

Registry membership itself is correct, confirmed in the constant: `no-touch-keys.ts:59` is `export const LORE_INGESTED_AT_KEY = "loreIngestedAt"` and `:65-68` puts it in `NO_TOUCH_KEYS`; `packages/shared/supabase/database/schema/public/functions/page_patch.sql:81` emits the matching `ARRAY['lastViewedAt', 'loreIngestedAt']` test. Only the stamping contract has drifted.

Searched `findings/` as its own run before filing: `rg -l -i "no-touch|noTouch|loreIngestedAt|ceilInstant" findings/` returned three and I opened all three. `database/page-patch-touch-diverges.md` is about one of four procs never suppressing the touch; `pages-system/drop-detector-blind-to-no-touch-patches.md` about the drop detector not seeing such a patch; `database/proc-byte-equality-skip-set-is-a-quarter.md` a different proc count. None is about the value the writer stamps.
