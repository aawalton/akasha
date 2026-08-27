---
id: 2d7ef494-7d85-549a-ace8-9796afd1cc0e
page-type-slug: finding
title: "Two test suites read Alan live and pass either way"
domain-slug: domain/pages-system
---

# Claim

Two test directories reach Alan's live corpus on the read path — 20 arrivals, 8 `GET /page-types` and 12 `POST /q`. Pointing the origin at a dead port changes nothing they assert: both suites still pass, 114/0 and 424/0, and only the clock moves, 557ms to 17.8s and 3.63s to 27.7s. The dependency is silent in both directions, so production answering and production absent are both green. A fresh clone with no route to the service does not fail; it passes slowly.

# Evidence

Measured 2026-08-20 against the code at `621959c58b` by running. Instrument: a recorder logging method, path and body, with `PAGE_QUERY_ORIGIN` pointed at it, controlled by a write that arrived before any zero was trusted.

Population: 94 test files over 12 directories, every package holding one of the 29 non-test modules importing a page-query write function. Two reach the service, both only to read. `daily-tracking-cli/src/lib` sends 8 `GET /page-types`. `shared/pages/access` sends 12 `POST /q`. Nothing arrived on a write route, which `621959c58b` now refuses outright.

The dead-port reading is the one that matters, and I ran it twice. With `PAGE_QUERY_ORIGIN` at a port nothing listens on, `daily-tracking-cli` ran 114 tests with 0 failures in 17.8s against 557ms reachable; `shared/pages/access` ran 424 with 0 failures in 27.7s against 3.63s. Identical verdicts, 32x and 7.6x the clock.

The mechanism is that a failed read is a value rather than an exception. `readFromPageQueryService` returns `{ ok: false, why }` on a refusal, timeout or unparseable JSON and never throws; `ASK_CEILING_MS` is 5,000, which is where the seconds come from. `rosterOverFetch` catches its own failure, warns to the console and returns null, and `backingOf` then answers from whatever the page-type rows say. So a caller that ignores `ok` cannot tell an answer from an absence.

This is a correctness hazard for the suite, not a data one: the write funnel is closed and no arrival touched it. The cost is that these suites report on Alan's live corpus rather than a fixture, so their verdicts move when his data moves.

Cluster CI is deliberately down for this window and returns after Alan's review. A suite that quietly depends on production answering changes character the moment it runs on a schedule rather than under a person who might notice 27 seconds where there were 3.

Not established: whether these 20 are the whole population. Only the 12 directories above were swept.
