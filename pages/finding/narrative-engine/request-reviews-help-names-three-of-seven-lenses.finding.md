---
id: ac515119-97c4-52ea-b239-219011bcba32
slug: request-reviews-help-names-three-of-seven-lenses
page-type-slug: finding
title: "Request reviews help names three of seven lenses"
domain-slug: domain/narrative-engine
---

# Claim

`ops awen request-reviews` describes itself as resolving a game's editor seats "over the facts/diction/patterns lens set" — three. The set it actually resolves is `PACING_LENSES`, which holds seven: the four parallel patterns sub-lenses stand beside the original three. Only a reader meets the wrong set — every caller goes through the loop over the real constant — so nothing fails, the help stays green, and it under-reports by more than half the editor fleet a game must seat.

# Evidence

Measured 2026-08-08 from `/home/walton/code` while emptying `dirty/code/packages-alanwalton-awen-docs-craft-author-editors.md`, whose line 35 states the seven-lens split correctly — the quarantined document was right and the live help was wrong, which is what prompted the check.

The description. `ops awen request-reviews --help` prints "each editor seat by the awen-editor--<base>-<lens> convention (over the facts/diction/patterns lens set)". The same string is hard-coded at `packages/alanwalton/awen/src/awen/request-reviews.ts:27`, and `registry.ts:97` carries the one-line summary beside it.

The real set. `packages/alanwalton/awen/src/awen/pacing-core.ts:28` declares `PACING_LENSES` as an `as const` array of seven: `facts`, `diction`, `patterns`, `patterns-reaction`, `patterns-telling`, `patterns-boundary`, `patterns-gestalt`. Its own header says the patterns lens "is SPLIT into four parallel hand-judged sub-lens seats (#15304)" and that the legacy single `patterns` seat is retained for the transition.

The verb resolves over the real set, not the described one. `request-reviews-access.ts:12` imports `PACING_LENSES` and `:96` loops `for (const lens of PACING_LENSES)`. I read the constant and the loop rather than the comments above them.

Why it stays green: the wrong set is only ever read, never executed. A caller's seats are resolved from the constant, and an absent seat is skipped with a warning rather than refused, so a game seated from the help text — three seats instead of six live ones — produces a successful dispatch with four lenses silently unreviewed.

Same shape as `pages/finding/akasha-repo/dev-server-app-flag-names-two-of-five.finding.md`, which I opened before filing: a help string naming two of five apps while the module exports the true set. Different CLI, different registry, so this is not that finding recurring.

Not measured: whether any game is seated from the help rather than the boot prose, nor whether this string and `gm-boot-sections.ts:286` (which names all six) were ever deliberately reconciled.
