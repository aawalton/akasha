---
id: 3fd412ca-14d4-4a56-aa26-5cc13b7dcefb
page-type-slug: finding
title: "The .md guards that answer for non-pages number about twenty-four, not eleven"
slug: md-only-guards-are-more-than-eleven
domain-slug: domain/pages-system
---

# Claim

Sweeping the whole repository for the shape `md-only-guards-answer-for-non-pages` describes — a readdir or glob filtered on `.md` whose survivors are then treated as pages of one type — finds fourteen sites that finding does not list, in packages it did not reach. Some are acted on rather than reported. The correct test already exists and is already used in one place: `pageTypeOf` reads the page type off the name.

# Evidence

Read 2026-08-28. Acted on: `tools/lib/email-rules.ts:56`, whose survivor becomes an email `Rule` slugged from the file stem and drives filing, forwarding and delayed actions; `tools/lib/compose-seat-name.ts:35` over `placeDirOf("person")`, whose survivors become principals; `tools/compose-subagents.ts:118`, whose survivors become subagent definitions written to a JSON file at `:130`.

Reported or thrown: `rule/set/set.ts:88`, a second copy of the rule-set fault in another package; `monarch/files.ts:71`, which throws `no slug, so nothing names this page` on a survivor — a fabricated failure; `tools/lib/oauth-page-credential.ts:53` and `services/claude-account-upkeep-stall.ts:95` over the same account folder; `tools/commands/finding/rehome.ts:109`, milder, since the destination is re-derived afterwards.

In the editor extension: `src/seat/seat-page.ts:139`, `src/features/transcript/sources.ts:68`, `src/features/terminal-rename/activate.ts:85`, and `src/features/work-tree/activate.ts:35`, whose `CORPUS_GLOB` is `pages/initiative/**/*.md` — the very folder scan `tools/lib/work-tree-asked.ts` replaced, still standing on the watch side.

Also `tools/lib/seat-page-read.sh:19`, the shell twin of the seat-presence guard, and `tools/lib/check.ts:65`, where `markdownUnder` is the shared root the seat-slot scan draws its `.md`-ness from.

The population, swept with `pageTypeOf` over `git ls-files`: 61,057 tracked `.md`, 1,911 carrying no page type, 28 of those outside `dirty/`, and exactly one of the 28 sitting in a folder any of these guards scans.

`tools/lib/seat-vocabulary.ts:35` scans `.md` and then calls `pageTypeOf` at `:42`. It is the pattern the rest want.
