---
id: 59f46ed1-a5fe-5dd4-a781-7ab8adf753a4
page-type-slug: finding
title: "Amy faucet directive unimplemented"
domain-slug: page-type/persona-points-source
---

# Claim

Alan's 2026-07-25 directive settled that the persona Amy serves Health rather than Love, and changed her points faucet from Jen session-time metering to a count of total tasks completed per day with green day set to 10 — a design and scope for the change existed but the code, data and docs were not updated to match.

# Evidence

Project #16235, domain `persona-points-source`, tags `personas faucet amy daily-tracking health author:sophia`, owner `sophia`, status `someday_maybe`.

ALAN'S DIRECTIVE (verbatim, 2026-07-25, answering an ask-alan question about Amy's Love-vs-Health contradiction): "Amy serves health, she should not get points from time with Jen, instead lets make it from total tasks completed that day, green is 10." Her `value` relation was always Health; earningNarrative and docs were the stale side. Stop earning from Jen session-time (`lovePoints`); earn instead from total tasks completed per day, green day = 10.

MEASURED STATE: totalPoints 153353.6955, greenDayPoints 3600, faucetKind external (LOVE_SESSION_SPEC), value = Health, page id 019eb900-4c8c-7304-aae1-b287c6b53b3e. 901 `completed-task` rows exist; last-30-days mean 8.2/day, median 8, only 6/30 days reach >=10, so 10 is a genuine stretch bar.

PREDICTED LEVEL: now 42.6 green-day equivalents -> level 2; after (901/10) 90.1 -> level 3, raising her level. If observed level is not 3, investigate.

DESIGN: `faucet-engine.ts fetchPersonaDayRows` (~line 197) filters on persona+date; `completed-task` rows carry only `completedAt`/`taskPageId` — windowed/count would count zero. Reuse `writeCompletionPointsDaily` (faucet-economy-pattern.md), which counts done pages by `completedAt` in the ESO window. Amy keeps `faucetKind=external`, gains `faucetSource=task-completions`; greenDayPoints 3600->10.

SCOPE: CODE — drop `amy` from SESSION_SPECS_BY_SLUG, delete LOVE_SESSION_SPEC, remove Love calls from run-commit-points.ts; add task-completions source. Existence-check `lovePoints`, retire if Amy was its only consumer (cf #16161). DATA via `bun ops page patch`. DOCS first — earningNarrative, daily-tracking/CLAUDE.md, faucet-economy-pattern.md wrongly name Amy Love-session.

Capture cut at a paragraph boundary; above is its head. Never defined — no objective was written.
