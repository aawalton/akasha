---
id: 08a89ff6-6590-56ca-a9d0-823fa144743e
page-type-slug: finding
title: "Frame enum halves disagree"
domain-slug: domain/pages-system
---

# Claim

The two halves of the `detailConfig` contract disagree on one enum value, because only one half is
code. The Zod schema accepts `loadScroll: "new-top"`, tests it and ships an engine default returning
it; the JSON Schema that gates the write is a database row omitting it under
`additionalProperties: false`, so writing that value is refused today. Nothing reads both halves,
and the row is held in no seed, migration or fixture.

# Evidence

Read and run 2026-08-07 against `~/code` at `main` `1313565199`, and against the live database.

The code half. `packages/shared/pages/core/src/schema/detail-config.ts:40` declares
`loadScroll: z.enum(["start", "end", "new-top", "progress"]).optional()`.
`detail-config.unit.test.ts:90` asserts `new-top` parses. `frameDefaultForEngine`
(`packages/alanwalton/awen/core/src/game-schema.ts:252`) returns it as the awen default, pinned by
`awen-core-display.unit.test.ts:245`. `pages/ui/src/frame/frame-config.ts:45` maps it to a top
anchor, tested at `:34`, `:41` and `:49`.

The gating half. `ops page-type show` refuses the id — it is a page, not a page-type. Read with
`bun ops page show 019f23fa-6dd5-7e9c-b274-3cc302d5ae73`: `stringId` `detailConfig`, `pageTypeSlug`
`property-definition`, `updatedAt` 2026-07-16. Its `schema` carries
`"loadScroll":{"enum":["start","end","progress"]}` under `additionalProperties:false`. No `new-top`.

That the row is the only carrier: `git grep additionalProperties` over `*.sql`, `*.json` and
`supabase/` returns nothing, and the enum literal is in no tracked file.

That nothing spans them: `git grep propertyDefinitions packages/infra/checks/` returns nothing, so
no check reads the gating half, and no test or type reads both.

Why nothing has bitten: awen sources its frame off-page-type from `ResolvedGameDisplay.frame`
because the `game` page-type is shared, so the one producer of `new-top` never writes it to a row.
Latent divergence rather than live loss.

Not judged: which half moves. The docstring above `frameConfigSchema` declares a loosening sweep
free, which points at the row; nothing states the reverse.

Found while ingesting `dirty/questions/code-repo-pages.md`, whose last entry states the same
disagreement. That file is quarantined and queued for removal.
