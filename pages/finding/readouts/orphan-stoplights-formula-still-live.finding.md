---
id: 506a75da-1190-53e4-a79e-356f3d17b964
slug: orphan-stoplights-formula-still-live
page-type-slug: finding
title: "Orphan stoplights formula still live"
domain-slug: domain/global
---

# Claim

A superseded `stoplights` formula is still live on the `daily-tracking` page-type — today the file `pages/page-property-definition/daily-tracking-stoplights.page-property-definition.md` — computing a second copy of the six value circles that no code reads. It was superseded by #13637, when the circles moved to `@shared/status-bar-access`, and the row was never retired — so the estate holds two independent renderings of one ladder, and only one of them has a test, a reviewer or a package.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded it on 2026-07-28. That document is queued for removal, so the observation is filed here to outlive it. Every reading below was re-taken today.

The row is live: `property-definition` id `019edc23-23f1-7781-8a8e-db9ccd377a0d`, `stringId` `stoplights`, `type` `formula`, `deleted_at` null, on page-type `019e82ee-239a-70ea-8e6d-8b7bbfc3ee3e` (`daily-tracking`, one of its 49 definitions). Its `config.expression` concatenates six ladders of the shape `(faithLevel == 4) && "🔵" || (faithLevel == 3) && "🟢" || (faithLevel == 2) && "🟡" || (faithLevel == 1) && "🔴" || "⚫"` over `faithLevel`, `loveLevel`, `healthLevel`, `learnLevel`, `funLevel` and `wealthLevel`.

Where to look now the property definitions are files. `pages/page-property-definition/daily-tracking-stoplights.page-property-definition.md` carries id `b06cf496-89e1-5ff9-939e-254e7d870f60`, `key: stoplights`, `type: formula`, `returnType: text`, `defined-on-slug: page-type/daily-tracking`, one of the 46 definitions naming that type. The same six ladders stand in its `expression:`, spelled `prop(faith-level)` through `prop(wealth-level)`.

Nothing reads it. `rg` for the definition's uuid across `~/code` excluding `dist` returns nothing at all. `rg -n 'stoplights'` over `*.ts`/`*.tsx` under `packages/` returns only the VSCode slot discriminator `kind: "stoplights"` in `features/status-bar/slots.ts` and its two unit tests — a slot name, not a read of this property.

Still nothing, over the akasha tree. The uuid above appears in no file. The slot discriminator is now `editor-extension/src/features/status-bar/slots.ts:75,86,97` with `slot-types.ts:55`, `render.ts:176` and `activate.ts:76` beside it. The other `"stoplights"` hits are a points-source KIND — `tools/lib/daily-tracking/points-source-engine.ts:75,129,261`, `points-source-writer.ts:154`, `totals-cumulative.ts:117`, `alanwalton/personas-core/src/points-source-coherence.ts:11` — and a widget payload field name. None reads the `daily-tracking` page's `stoplights` value.

The instrument was made to fail first: querying `attributes->>'stringId'` for the page-type row returns nothing, because page-type rows carry the slug in the `slug` column while property-definition rows carry it in `attributes->>'stringId'` and relate up by `attributes->>'pageType'`. That query has no store to run against now; the same reading is `defined-on-slug:` on the property definition file.

What changed since the 2026-07-28 reading: the two vscode-extension documents that pointed at this row are no longer live code. `feature-status-bar.md` was quarantined into the instructions repo in `7205e28efd` and now stands at `dirty/code/packages-agents-vscode-extension-docs-feature-status-bar.md`, which binds nobody and is itself queued for removal. `dirty/code/` no longer exists, so that half is fully closed; the orphan property is not.

Not measured: whether any saved view is configured to show the column, and whether the two ladders currently agree.
