---
id: 917c5d75-57a8-5ffb-8930-04ce41a6fd8a
slug: cover-variant-reason-outlived-the-seed
page-type-slug: finding
title: "Cover variant reason outlived the seed"
domain-slug: domain/alanwalton-app
---

# Claim

The idle gacha's header explains its cover-variant count with a row state the rows contradict. `packages/alanwalton/web/app/idle/lib/gacha-draw-context.server.ts:27` reads "Today that is one migrated level-1 cover per girl", where only 4 of the 38 live `kind="cover"` `persona-image` rows sit at `relationshipLevel` 1 and 34 sit at levels 2 through 5. The count is right and its stated reason is wrong, so a reader dates the second variant's arrival from a state Alan's level-tag pass replaced.

# Evidence

Measured 2026-08-08 while emptying `dirty/code/packages-alanwalton-personas-docs-anchor-cover.md`.

Method: `ops page list --type persona-image --properties kind,relationshipLevel --all --json` returns 220 rows. By the `kind` select: `reward` 101, `wallpaper` 43, `cover` 38, `anchor` 38. The 38 covers by `relationshipLevel` are level 1: 4, level 2: 14, level 3: 9, level 4: 4, level 5: 7. I read the tally rather than sampling.

So 38 covers over 38 personas is one apiece, and 34 have been re-tagged off the `relationshipLevel=1` seed that `personas/cli/src/persona/migrate-anchor-cover.ts` wrote. That verb's own docblock calls the level-1 value a migration default awaiting Alan's manual pass; the distribution is that pass having happened.

The sentence sits inside the COVER-AS-VARIANT paragraph at lines 22-29, and line 27 is the clause at issue. The code below it is correct and unaffected: 134-139 read `getPages(sb, { pageTypeSlug: "persona-image", where: [{ key: "kind", eq: "cover" }], select: ["id", "persona"], limit: 10000 })`, and 140-144 fold each row id into the per-slug pools. Nothing reads the comment, so nothing is broken; what it costs is a reader's model of when a second cover variant appears.

The quarantined head document carried the same claim and was cut on this census rather than on the two prose copies agreeing.

Searched `~/memory/findings/` first, as its own call: `rg -l -i "docblock.*row|row census|rows contradict|comment.*rows|level-1 cover|migrated level" findings/` returns 36 documents, and I opened the two closest instead of resting on names. `alanwalton-app/mixed-bar-rows-are-eight-not-five.md` is this method on `relationship-progress` bars, a different subject. `code-quality/citation-class-filed-thirty-times.md` warns against another dangling-citation instance, which this is not.
