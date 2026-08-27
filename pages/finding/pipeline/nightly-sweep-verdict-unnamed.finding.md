---
id: 8d0d0dfe-ced5-5d8b-8b96-3d0e5aa5e94d
slug: nightly-sweep-verdict-unnamed
page-type-slug: finding
title: "Nightly sweep verdict unnamed"
domain-slug: page-type/pipeline
---

# Claim

The nightly `slow-suite-sweep` backstop on main detects a failure but reports only one line per shard (`verdict=fail`) naming no suite, test or assertion, so an operator who sees a failing shard must re-run every suite in it by hand to learn what broke, and the underlying `bun test` output that would identify the failure is produced and discarded before it reaches the log.

# Evidence

From project #16206 (domain `pipeline`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25T15:09:17Z, moved from the retired `notes` attribute 2026-08-15.

Measured by running `bun ops tests slow-suite-sweep` against main — 570 suites, 12 shards, diff-independent (no git diff, no import graph, no dependency cone). The entire output is one line per shard, e.g.:
```
[slow-suite sweep] shard 7/12 — verdict=pass; Ran 445 tests across 61 files. [25.73s]
[slow-suite sweep] shard 8/12 — verdict=fail; Ran 459 tests across 61 files. [46.92s]
```
`verdict=fail` names no suite, test, assertion or error; the whole log is 19 lines.

Detection works: the sweep is diff-independent, so the string-coupling blind spot that hid `upsert.database.test.ts` (project #16202, filed as `findings/pages-system/owner-guard-test-unselectable`) cannot hide anything from it — the nightly CronJob (#15509, live 9 days, `17 9 * * *`) can see a failure.

The defect: run knowing a failure existed (the same `upsert.database.test.ts` failure — `16 pass, 1 fail, 17 tests`), the shard output still could not establish shard 8's failure was that test; shard 8 covers 61 unnamed files. "A verdict that cannot name its member is not a verdict; it is a mood."

Why it matters: this is the only backstop between a dormant main failure and nobody noticing, running nightly unattended at 09:17Z. A failure naming nothing is triaged by nobody and degrades to green-by-omission with a 27-minute alibi; exit code may be correct while output is unactionable.

Direction carried: print the failing suite paths and assertion output on a fail shard — `bun test` already emits the full failing test name and stack, so the information is produced and discarded before display. Also flagged: whether a nightly sweep's result needs a durable landing surface, since a failure nobody reads is indistinguishable from a pass.
