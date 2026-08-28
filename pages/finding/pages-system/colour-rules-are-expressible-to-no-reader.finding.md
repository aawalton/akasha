---
id: 099c6d04-2b1e-5148-985a-32458e2a7a68
slug: colour-rules-are-expressible-to-no-reader
page-type-slug: finding
title: "Colour rules are expressible to no reader, including through values"
domain-slug: domain/pages-system
---

# Claim

165 authored `colorRules` across 29 property definitions reach no file-backed reader. The `values:` map form admits a `color` per option, but `labelled()` (`code:packages/shared/pages/access/src/file-property-defs.ts:85-91`) extracts only `label` and drops `color`, so even a property document stating colours would render none. Writing one is the green-over-empty trap rather than a repair. Recorded here so whoever re-decides presentation starts from what was chosen.

# Evidence

Measured 2026-08-20 over `DATABASE_ADHOC_URL`. 29 definitions, 165 rules, splitting 16 selects / 100 rules, 7 formulas / 35, 6 numbers / 30. All 100 select rules are pure `value == "X"` equality; the 65 numeric rules are `>=` ladders.

Grade scale, 16 rules each on `collection-template.rating` and `story-chapter.rating`: F default; S+, S, S- red; A+, A, A- green; B+, B, B- blue; C+, C, C- yellow; D+, D, D- orange.

Status, 7 rules each on `collection-template.status`, `story-chapter.status`, `topic.status`. Rank, 6 each on `collection-template.rank` and `story-chapter.rank`: S-Rank red, A-Rank green, B-Rank blue, C-Rank yellow, D-Rank orange, Not Ranked default. Maturity, 3 each on both `maturityRating`: PG green, PG-13 yellow, R red. Also `value.color` 6, `topic.sensitivity` 5, `error.status` 4, `temper-task.priority` 4, `temper-task.scope` 4, `temper-completed-task.scope` 4, `idle-persona-card.lockState` 2.

The 13 `daily-tracking` ladders carry 5 rules apiece over the six life areas — faith, fun, health, learn, love, wealth — as both `<area>Points` and `<area>Level`, plus `totalLevel`.

Two consumers survive the rows and one does not. `code:packages/alanwalton/web/app/idle/lib/idle-card-page-type.ts:111,190` holds a compiled-in copy, so idle cards keep their colours. `code:packages/infra/checks/src/checks/check-color-rule-variants.ts` reads `property-definition` rows over `SUPABASE_URL`; with no rows its population is zero and it reports over nothing.

# Re-check

Checked again 2026-08-28 at HEAD, in akasha rather than `~/code`. The mechanism holds and one statement is false rather than merely old.

`labelled()` stands at `shared/pages-access/src/file-property-defs.ts:59-65`, not at the cited `:85-91`, and it does drop `color`: the `SelectOption` it returns is declared `{ id, label }` at `:57`, so colour is absent from the type rather than read and discarded. The gap is wider than the claim. `definitionOf` at `:88-100` emits only `id`, `key`, `title`, `type`, `pageId` and `config.options`; the file-backed `PropertyDefinition` at `page-type-config.ts:9-25` carries no `colorRules` field at all; and the wire `DeclarationSchema` at `shared/pages-query/src/ask.ts:204-214` has nowhere to put one. A property document stating colours reaches no reader at any point on that path, not only at the extraction.

`check-color-rule-variants` does not stand in this repository, so the sentence saying it "reports over nothing" is false here rather than true-but-empty. There is no `infra/checks/` tree; nothing under `infra/cluster-checks/` or `checks-system/` reads property definitions over `SUPABASE_URL`. One consumer survives, not two. The compiled-in copy does survive, at exactly the cited lines: `alanwalton/web/app/idle/lib/idle-card-page-type.ts:111,190`.

The 165 rules cannot be counted again from here: `DATABASE_ADHOC_URL` is named by no code in this tree. The corpus was reached through the index rather than by a folder glob, so it is all 2,285: 2,228 under `pages/page-property-definition/` and the 57 filed beside their own domains under `graph/` and `readouts/`, which a glob rooted at `pages/` does not see. Across all 2,285 none states `colorRules`, and none states a colour on an option — the four outside `pages/` carrying a `values:` map carry plain string lists. Several documents do declare a property whose own key is `color`, among them `calendar-event-source-color`, `color-hex` and `ctw-team-color-hex`; that is a page's own colour property rather than the per-option presentation colour this finding is about, and an earlier draft of this re-check read as denying it. The one authored survivor of the colour-ladder pattern is `pages/page-property-definition/daily-tracking-stoplights.page-property-definition.md:8`, which emits coloured discs from an `expression:` rather than from rules.

What keeps this open is unchanged, and is sharper than when it was written: `pages/page-property-definition/option-color.page-property-definition.md` declares `key: color` on `page-property-type/option`, so the colour a document may state is a live schema in this tree, while `labelled()` at `:61` reads its sibling `label` and nothing else.
