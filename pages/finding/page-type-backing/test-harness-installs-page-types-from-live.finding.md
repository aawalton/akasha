---
id: 64cd6985-4da3-5319-8da1-6f6291329f5a
slug: test-harness-installs-page-types-from-live
page-type-slug: finding
title: "Test harness installs page types from live"
domain-slug: domain/global
---

# Claim

The database test harness builds its page types by fetching them out of the live production database at test time, so retiring a page type breaks the test suite rather than any product, and four types retired on 2026-08-19 are still fetched this way today.

# Evidence

`packages/shared/supabase/test-harness/src/install-from-live.ts:279` defines `installPageTypesFromLive`, which calls `fetchPageTypeSnapshots` at `:159`. That function reads the page-type row, its property definitions and its relation targets out of live Supabase and replays them into a throwaway pglite transaction. There is no local fallback and no committed snapshot for any type, so a test's page types exist only as long as the production rows do.

41 files call it. The slugs they name directly are `automation`, `daily-tracking`, `session-tracking`, `project`, `task`, `merge-queue`, `pipeline`, `step` and `workflow`. Reached through SCREAMING_SNAKE constants rather than literals: `notification`, `option-list`, `page-type`, `persona`, `property-definition`, `question`, `relationship-progress` and `app`.

Four of those now have no row in either state. `merge-queue`, `pipeline`, `step` and `workflow` were hard-deleted on 2026-08-19 along with 1,060,372 pages. Every database test installing one of them fails at setup as things stand.

`test-page` is the sharpest case of the coupling. Eleven `*.database.test.ts` files under `packages/automation/orchestrator/src/actions/` install it, and it carries 18 property definitions, one of every property type there is, which those tests read deliberately. It looks like pure test residue from its two pages and reads as safe to retire from every other angle.

Not measured: whether these tests run at present, the workstation checks being deliberately down.

Read on `main`, 2026-08-19.
