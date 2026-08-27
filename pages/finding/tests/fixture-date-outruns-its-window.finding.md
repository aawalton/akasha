---
id: 2b1a93e9-1389-5531-aa5c-fdde1742b0fc
slug: fixture-date-outruns-its-window
page-type-slug: finding
title: "Fixture date outruns its window"
domain-slug: domain/global
---

# Claim

`packages/temper/watcher/cli/src/temper/watcher/logs.cli.test.ts` went red on main today and will stay red. Its two fixtures carry fixed 2026-05-06 timestamps and every case passes `--since 100d`; 2026-08-14 is day 100, so the window now excludes all seven records and four cases read zero where they expect seven and two. The author saw the drift coming and defused it with a constant that expires on the same clock. Raising the number re-arms it. Only the nightly slow-suite sweep observes this file.

# Evidence

## Measured here, not read off the sweep

The 2026-08-14 09:44 UTC sweep reported three files newly red on main and said plainly it cannot say why: a red there is either code broken on main or the pod and workstation disagreeing (#18163). Both unowned files were run on an untouched `~/code` at `c46b79c85b`, which is `origin/main`.

- `verdict-channel.cli.test.ts` — 28 pass, 0 fail, 40 assertions. Green on the workstation, red in the pod: the disagreement class, not a defect on main.
- `logs.cli.test.ts` — 2 pass, 4 fail. Genuinely broken, and broken everywhere.

The third, `get-status-bar-snapshot.database.test.ts`, is known: #18916 broke it, #18909 carries the repair on an unlanded branch.

## The mechanism

`watcher.log` and `tray.log` in the test's own directory carry absolute timestamps beginning `2026-05-06T08:00:00`. Every case passes `--since 100d`, and a comment above `EXPECTED_TOTAL` gives the reason: the fixtures "use 2026-05-06 morning timestamps, so callers MUST pass `--since 100d` (or larger) to keep them inside the window once `now` drifts."

2026-05-06 to 2026-08-14 is exactly 100 days. The window written to survive drift has been overtaken by it, and every further day widens the gap. The failures read `Expected: 7, Received: 0` and `Expected: 2, Received: 0`, so the merge and tie-break logic is untested rather than wrong.

## Why raising the constant is the wrong repair

It re-arms the identical bomb on a later date, and the next person meets the same comment reassuring them it was handled. What removes the class is deriving the window from the fixture's own age, or writing the fixtures relative to now. Which belongs to whoever owns the package.

Nothing but the nightly sweep runs it: `.cli` is dropped wholesale from branch CI, so a green branch verdict says nothing about it. This is the sweep working, reporting on the first morning the file was red.

## Delete this when

The suite passes on main without a fixed-date fixture racing a fixed window, or a project is opened for it.
