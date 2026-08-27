---
id: cbe6080b-5781-5d64-b7ef-71d682b41a73
page-type-slug: finding
title: "The Tower's visual style stands only on a database row and no file in the stories repository carries it"
domain-slug: domain/global
---

# Claim

The Tower's visual style stands only on a database row, and no file in the stories repository carries it.

# Evidence

The text, verbatim from the `visualStyle` property of the `story` row titled "The Tower", id `019efbd1-d641-727d-8e98-4f10ccc0cfba`, `externalId: the-tower`:

> ominous System-tower LitRPG art; cold vertical light and faint UI glow; desaturated slate, ash, and pale cyan palette; stark deep shadow; clean cinematic semi-realistic finish, isolating and tense

That row carries no slug, so nothing standing beneath it can be named for it.

126 rows across `story`, `authored-story`, `emergent-story` and `reading-story` carry a `visualStyle`, and none of the 144 `story.md` files in the stories repository carries the key in any form. Alan read the set on 2026-08-18 and kept this one; the other 125 he settled as not needing to be preserved.

`packages/stories/cli/src/lib/chapter-cover.ts` reads `visualStyle` off the story row and appends it to the image prompt in `composeImagePrompt` before a chapter cover is generated. That is the only reader outside the migration payload at `packages/collections/litrpg/src/migrate/payload.ts`.
