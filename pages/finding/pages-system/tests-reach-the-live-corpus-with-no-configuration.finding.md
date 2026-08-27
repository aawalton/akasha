---
id: 6a4a7f89-7c13-51dc-b304-b7bb15774fb2
slug: tests-reach-the-live-corpus-with-no-configuration
page-type-slug: finding
title: "Tests reach the live corpus with no configuration"
domain-slug: domain/pages-system
---

# Claim

A unit test needs no configuration to write to Alan's real corpus. The compiled-in default origin in `@shared/pages-query` resolves from this workstation and answers, so a test reaching the write seam lands files in a gated repo that pushes to origin. Four of five `import-tasks` tests mocked `@shared/pages-access` and not its sibling `@shared/pages-query`, and filed 29 real pages while passing. A recorder sweep of 94 further test files found reads reaching the live service and no writes.

# Evidence

Measured 2026-08-20 against the code at `8cbbf03d1c` by running, not reading.

The seam is open by default. `pageQueryOrigin()` falls back to `http://page-query-service.page-query-service.svc.cluster.local:8787`. `PAGE_QUERY_ORIGIN` is unset in `.secrets.env`, in the profile and under `env -i`, yet that hostname resolves here to 10.100.134.88 and a GET answers. So no environment variable is what arms this; the default is live.

The mechanism is a partial mock. At `e96adb93fb^`, `import-tasks.unit.test.ts` mocked both `@shared/pages-access` and `@shared/pages-query`; `import-tasks-logical-day` and the three under `import-tasks-complete-forever` mocked only the first, while `import-tasks.ts:11` imports `patchPage` and `writeRow` from the second. `COMPLETED_AT_S = 1_700_000_000` at `mocked-pages-access.ts:37` is 2023-11-14, which is why the rows landed in one month. `e96adb93fb` added the missing mock; all five now run clean.

Method: a recorder logging method, path and body, with `PAGE_QUERY_ORIGIN` pointed at it so nothing reaches the real service. Proved end to end by a throwaway test calling `writePage`, which arrived as `POST /write/probe-type/probe-name` with the exact body. Without that control every zero below is worthless.

Population: 94 test files over 12 directories, covering every package holding one of the 29 non-test modules that import a write function. Arrivals: `daily-tracking-cli/src/lib` sent 8 `GET /page-types`; `shared/pages/access` sent 12 `POST /q`. Both are read routes. Everything else was silent, and no arrival touched `/write`, `/patch`, `/patch-state`, `/remove`, `/write-row`, `/patch-row` or `/remove-row`.

One instrument correction: I first tallied POST as write. The query service takes reads by POST too, so that count was wrong and the twelve were queries. Tally by route, never by method.

CI is down, so all of this is inert today. A test that reaches the seam is armed the moment it runs on a schedule, and nothing about it fails.
