---
id: 2aed8835-c9aa-5aae-9445-fdd442a1355e
page-type-slug: finding
title: "Relay date zone unknown"
domain-slug: domain/fitness
---

# Claim

`cardio-ingest`'s production date gate (`checkIngestDate`, comparing `date` against `getEsoDayStr`) rejects any date ahead of the ESO day, and whether the macbook HealthKit relay file — written outside this repo, into iCloud — stamps a UTC or macbook-local date cannot be determined from the source tree. If it stamps UTC, a fresh ingest is silently refused every day during the window where UTC has rolled to the next day but the ESO day has not.

# Evidence

Found while running branch CI for #15930 (unrelated project); the test half is already fixed there.

First-hand observation, 2026-07-26 00:0xZ: `packages/alanwalton/daily-tracking-cli/src/cardio-ingest.unit.test.ts` failed with "DataError: cardio-ingest: refusing date 2026-07-26 - date is in the future (esoToday 2026-07-25)". The test built "today" with raw `new Date().toISOString().slice(0,10)` (UTC), fed to a gate comparing against `getEsoDayStr()` (the ESO day). Once UTC rolls past midnight but the ESO day hasn't, UTC-today is one day ahead and the gate rejects it as future-dated.

Fixed in #15930 (test only): now derives its date from `getEsoDayStr(new Date())`, the same canonical helper `cardio-ingest.ts:79` uses, per the Timezone Handling rule (every "what day is it" decision routes through one canonical helper per zone-domain). Unambiguous test defect, closed.

Open question this row exists for: does the same skew hit production? `checkIngestDate(date, esoToday)` rejects any `date` ahead of the ESO day. `date` comes from the relay file the macbook's HealthKit export writes to iCloud, outside this repo, so which day-domain it stamps (UTC vs macbook-local MDT vs other) can't be determined from source. If UTC, a fresh file during the UTC-ahead-of-ESO window is refused with exit 3, failing a scheduled ingest daily. If MDT (UTC-6), it sits behind UTC and likely never bites. Not guessed at: needs one observation the repo can't supply — read the live relay file's `date` field against `getEsoDayStr` at the same instant. Whoever owns daily-tracking should make that observation before deciding what needs a change.

Why worth a row: the file's own header comment says the pipeline "died unnoticed for 23 days" and a run that wrote nothing must not share an exit code with one that wrote. A date gate silently refusing fresh data in a recurring nightly window is the same failure shape.

Project #16365, someday_maybe, fitness, no objective; from retired `notes`, 2026-08-15.
