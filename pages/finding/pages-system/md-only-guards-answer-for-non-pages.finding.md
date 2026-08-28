---
id: 11a5f664-14fe-4d54-9f59-96675bc51dc8
page-type-slug: finding
title: "Eleven scans guard on .md where they mean a page, and answer for what they let through"
slug: md-only-guards-answer-for-non-pages
domain-slug: domain/pages-system
---

# Claim

Eleven scans filter a directory on `.md` and then treat every survivor as a page of one type. A file that is not a page of that type is not skipped and not refused: it is answered for, under a slug taken from its filename. One such file exists today, and in three of the eleven the answer is acted on rather than merely reported.

# Evidence

Acted on rather than reported. `services/sweep-log-days.ts:79` guards `name.endsWith(".md")` and the paths that pass reach `rm` at `:110` as well as the message at `:115`, so a `.md` in that folder carrying a `date:` field would be deleted; the `date` test at `:87` is the only thing between the two. `tools/lib/seat-presence-read.ts:66` guards `.md` over `agent/seat`, so any `.md` dropped there is read as a seat, ruled absent, and removed by `services/sweep-seat-pages.ts`; that guard is shared by eight callers. `tools/lib/service-project.ts:96` guards `.md` and hands the slug to `readServiceDoc` at `:103`, publishing a stray note as a workstation service.

Reported wrongly. `tools/audits/refusals-bound.ts:99` scans `${refusals}/*.md`, so a non-refusal there fails the check as `refusal-document-unprinted` — a fabricated failure. `monarch/rule-documents.ts:213` guards `.md` over the rule folder, so a `README.md` there would become a live category rule slugged `README`. `tools/commands/code-editor/color.ts:99`, `tools/lib/rules-engine-rule-set.ts:18`, `tools/turn-end-reading-cases.ts:98`, `tools/lib/seat-initiative.ts:34` and `tools/lib/seat-resolve.ts:74` do the same for their own types.

The one live instance: `pages/initiative/formula-name-translations.md` is tracked, carries no page type and no frontmatter, and reaches `tools/lib/seat-initiative.ts:80` today. Not `seat-resolve.ts:51`: re-measured 2026-08-28, that fallback runs only where the page-type scan found none, and `initiative` finds fifteen, so it is dormant for every populated slot. `tools/lib/work-tree-asked.ts:8` already records it by name as the reason a folder scan was replaced by a page query.

`repoint/reslug.ts:89` is the same fault on the other side: `declaredBy` tests the source for `.md` and tests the destination not at all, so `ops mv` of a page to a non-page name reaches `:82` with a destination that is not a page. Every one of these guards is a place where a true empty and a failure read alike.
