---
page-type-slug: finding
id: ecd05c23-4502-5084-98e0-63577e9fd6dd
slug: relationship-progress-store-gone
title: "Two commands describe a relationship-progress store that no longer exists"
domain-slug: page-type/persona-day
---

# Claim

Two ops commands describe `relationship-progress` rows and a persona's bar living on her row, and neither exists. The page type is gone from the memory repo and the persona row it names is not what carries her bar.

`ops persona points-source rescore` describes work that no longer exists at all: it rewrites a denormalized bar copy and a materialized `greenDayFraction` across a persona's history, and neither key is on a persona day any more.

# Evidence

Read 2026-08-22.

`tools/commands/persona/points-source/rescore.ts:1` and `:26` name `relationship-progress` rows and state "bar lives on her persona row". `tools/commands/tracking/recompute-totals.ts:12` and `:22` name "relationship-progress rows' pillars" and say the command writes those rows directly.

`ls /var/home/walton/repos/memory/pages/` returns no `relationship-progress` directory, and no page type of that slug stands in the instructions repo. Sampled persona days at `memory:pages/persona-day/{abby,aelwyn,ione}/*.md` carry `green-day-points`, `source-points`, `value-slug` and `date` in frontmatter, with no `greenDayFraction`.

Not measured: whether either command still runs without error, what it does to a persona's days if run today, and whether anything schedules or calls them. The summaries were read; the command bodies were not.
