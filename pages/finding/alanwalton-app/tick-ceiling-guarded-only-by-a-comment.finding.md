---
id: 78e6b50d-961c-5ced-9fc2-c6bc18b596a1
page-type-slug: finding
title: "Tick ceiling guarded only by a comment"
domain-slug: domain/alanwalton-app
---

# Claim

Raising the idle tick worker's interval from 15 minutes to 30 would permanently multiply every player's idle earnings by 1.5, and nothing refuses it. The coupling that makes 30 minutes a ceiling — the tick restamps the clock the Afterglow long-absence branch measures against — is stated in a comment and in no assertion; the worker has no test file at all, and no test anywhere names both constants.

# Evidence

Read in `~/code` on 2026-08-08, emptying `dirty/code/packages-alanwalton-web-app-idle-claude.md`.

The mechanism, from executable lines rather than comments. In `app/idle/lib/core/constants.ts`: `:64` `export const AFTERGLOW_MIN_GAP_MS = 1800000` (30 min), `:65` `AFTERGLOW_BONUS = 0.5`, `:63` `AFTERGLOW_UNLOCK_STARS = 30`. `lib/core/accrual.ts:250` is `if (afterglowUnlocked && elapsedMs >= AFTERGLOW_MIN_GAP_MS) accrued *= 1 + AFTERGLOW_BONUS`. `elapsedMs` is `now − lastTickAt` and the worker restamps `lastTickAt` every tick, so its cadence is that comparison's left-hand side. `workers/idle-tick.worker.ts:81` is `const TICK_INTERVAL_MS = 900_000`. At 15 minutes the branch never fires from the tick; at 30 it fires every time.

It is latent, not harmless. The committed canonical save, `app/idle/lib/__fixtures__/scratch-state.json`, carries `"legacyStars":20` and `"afterglowUnlocked":false` against an unlock at 30 stars, so the bonus switches on the first time a player crosses ★30 — after the interval change, with nothing tying the two events together.

Nothing refuses the change. `git ls-files "packages/alanwalton/web/workers/**"` returns one path, the worker itself: no test file beside it. `rg -uuu -n "TICK_INTERVAL_MS" packages/` (the `-uuu` form, this being an absence claim; exit 0) returns the constant and its three uses here — the log line, the `intervalMs` metric field, the `sleepAbortable` call — plus unrelated constants of the same name in seven other workers. No assertion anywhere names both `TICK_INTERVAL_MS` and `AFTERGLOW_MIN_GAP_MS`.

What guards it is prose. The worker's docblock at lines 57-79 states the ceiling well, calls it "A landmine, not a margin" and cites the constants by line. `domains/code-quality.md` holds that no code comment carries an instruction, and `domains/instructions-harness.md` holds that anything a gate could refuse is not written as one. A gate could refuse this: both constants are compile-time literals in one repository, and asserting `TICK_INTERVAL_MS < AFTERGLOW_MIN_GAP_MS` turns the act away.
