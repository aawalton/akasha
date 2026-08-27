---
id: 0f25aa89-ea95-5fe7-b5ed-f68df48bdae4
slug: authors-notes-embedded-untagged
page-type-slug: finding
title: "Authors notes embedded untagged"
domain-slug: domain/global
---

# Claim

Many story chapters carry author's notes embedded at the start and/or end of their content — undercounted by crude regex markers (396/824 chapters match, with the true count higher since curly-quote and freeform variants evade ASCII regex) — and a boundary-pick architecture to extract them into separate authorsNoteBefore/authorsNoteAfter properties was ratified but its second, content-rewriting phase is blocked on the #15565 drain finishing.

# Evidence

Project #15629 (domain: narrative-abstraction), status someday_maybe, live-on: deploy. Carried no `# Objective`; the notes below are the observation.

Alan (2026-07-17): many chapters carry author's notes before and/or after the story content; move them to separate properties (one each: authorsNoteBefore, authorsNoteAfter). Presentation is diverse — regex insufficient (tried), model judgment needed for boundaries; possibly Haiku-simple. Notes appear ONLY at beginning and end, and can be quite long.

Measured: 396/824 chapters match crude note markers (author's-note/patreon/next-update variants); true count is higher — curly-quote and freeform variants evade ASCII regex (e.g. chapter 600 opens with a bracketed vacation note and tails with a multi-paragraph art-credits block).

Architecture (ratified, rhia design):
- BOUNDARY-PICK, NEVER REGENERATE: model reads head+tail windows only, returns two verbatim boundary markers (first/last story line); harness locates them by exact substring, slices, enforces byte-conservation (before+story+after == original, byte-identical). Model never writes content — the only judgment axis is boundary placement.
- MODEL TIER: Haiku piloted against hand-built ground truth (the #15564 lesson: measure the judgment axis, never presume the cheap tier). Escalate to Sonnet only on measured failure.
- PROPERTIES: authorsNoteBefore / authorsNoteAfter on story-chapter, verbatim-prose storage tier, schema string minLength 1, absent when no note.
- EXPAND-CONTRACT: child 1 extracts+writes the two properties (additive, safe alongside the running #15565 drain). Child 2 is the MOVE: strip notes from content + regenerate _prose + REBASE ALL BEATS (chronologyAnchors, class-skill sidecars key src.beat on paragraph indices; anchors recompute deterministically by re-grounding) + re-derive artifacts with diff audit. Child 2 is BLOCKED by #15565 completion (never split a drain across two prose regimes) and by child 1.
