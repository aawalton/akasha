---
id: 4253e482-990d-5fd0-ab9f-d2cf9d1eee58
slug: denver-day-end-unused
page-type-slug: finding
title: "Denver day end unused"
domain-slug: domain/code-quality
---

# Claim

`getDenverDayEnd` is exported from `@shared/recurrence/reset-times` and imported by nothing but its own unit test.

It is the only one of the four day-boundary helpers in that module standing behind no live decision, and the test that imports it is what keeps an unused-export check from seeing it.

# Evidence

Read 2026-08-07 off the `~/code` checkout.

`getDenverDayEnd` is declared at `packages/shared/recurrence/src/reset-times.ts:296`.

A `grep` for the identifier across every `.ts` and `.tsx` in the repo, excluding `node_modules` and `dist`, returns six lines. Five are in `packages/shared/recurrence/src/reset-times-mountain.unit.test.ts` — the import at line 4, the `describe` at line 14, and three assertions. The sixth is the declaration itself.

The three siblings it sits beside in the same module all have live callers: `getEsoDayStr` is reached from the formula builtins, the automation resolver, the daily-tracking CLI and the inbox poller; `getMountainMorningDayStr` keys medication-adherence days in `@alanwalton/meds`; `getMountainEveningDayStr` is used by `@alanwalton/daily-tracking-cli` to pick which row a sleep block joins.

`getDenverDayEnd` differs from all three in shape as well as in use: it returns the instant of the coming Denver midnight rather than a day string.

Found emptying `dirty/knowledge/logical-day-boundaries.md`, which recorded the same observation and is now removed with it.
