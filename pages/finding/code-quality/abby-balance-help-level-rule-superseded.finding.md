---
id: 39421526-99d6-5e97-90e2-389fa6ad6fc2
slug: abby-balance-help-level-rule-superseded
page-type-slug: finding
title: "Abby balance help level rule superseded"
domain-slug: domain/code-quality
---

# Claim

`ops abby balance --help` states the relationship level is "one level per 4,194,304 points, uncapped". The `computeLedger` the same verb calls derives level from a green-day-normalized lookup against a fixed four-step ladder that tops out at 5, and the gaps are not uniform. Run today, the verb prints level 4 where its own help's rule gives 2.

# Evidence

Read and run 2026-08-07 at the `~/code` working tree, emptying `dirty/code/packages-alanwalton-abby-claude.md`.

`packages/alanwalton/abby/cli/src/abby/balance.ts:11-18` is the exported `help`, a typed `CommandHelp`. Its `description` ends: "the relationship level/stage implied by cumulative points earned (one level per 4,194,304 points, uncapped)". `ops abby balance --help` prints that verbatim, so it is a readout, not a comment.

Line 126 calls `computeLedger`. I read the constants and body, not the docblock. `personas/core/src/ledger.ts:161-162` is `greenDayTotal = netBytes / (input.greenDayPoints ?? DEFAULT_GREEN_DAY_POINTS)`, then `level = levelForGreenDays(greenDayTotal)`. `WALLPAPER_COST = 2 ** 22` (line 20) is spent on `spent`, `balance` and `nextWallpaperDeficit` at 159, 160 and 165, and on nothing touching `level`.

`ladder.ts:128` is `DEFAULT_GREEN_DAY_POINTS = 10_000`; `ladder.ts:118` is `GREEN_BASELINE_DAYS = [7, 42, 180, 540]`, summed cumulatively by `levelForGreenDays` (216-229), which starts at 1 and breaks on the first unmet step. Byte thresholds are therefore 70,000, 490,000, 2,290,000 and 7,690,000 — not a constant 4,194,304. Four steps from 1 makes 5 the highest level returnable, so "uncapped" is false too, and `clampLevel` (251-253) bounds the stage lookup to `STAGES.length`, five.

Measured. `ops abby balance --json`, exit 0, returns `{"netBytes":4777582,…,"level":4,"stage":"Integrating",…}`. 4,777,582 ÷ 10,000 = 477.8 green-days, clearing the third cumulative step (229) and not the fourth (769) — level 4. The help's stated rule gives 2. `ledger.unit.test.ts:205-207` assert the true ladder; nothing asserts the help.

Distinct from `code-quality/abby-pending-help-ladder-off.md` (the other verb, the daily stoplight ladder) and `alanwalton-app/abby-faucet-scans-the-wrong-repo.md` (which repo the bytes come from, taking this same level-4 reading as correct).

Not established: whether the help was ever correct. Not repaired — Read-Only Main forbids writing into `~/code`.
