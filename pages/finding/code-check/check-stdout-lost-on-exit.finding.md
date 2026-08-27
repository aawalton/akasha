---
id: 876fb048-2f94-5256-8ad3-623645871b73
page-type-slug: finding
title: "Check stdout lost on exit"
domain-slug: domain/global
---

# Claim

A check's stdout is truncated through a pipe when `exitOnResult` calls `process.exit` after writing, so a violation list arrives shorter than it is and always errs toward clean. The known record of this attributes it to checks that performed an async read before reporting; a purely synchronous module truncates as well, so the exposed population is wider than an async preamble and the discriminator is the pipe rather than the read.

# Evidence

Measured 2026-08-07 on Bun 1.3.14.

THE EXIT PATH IS UNCHANGED. `violation-reporter.ts:293–300`: `exitOnResult` computes the code, calls `reportViolations(...)`, then `process.exit(code)` with nothing between.

THE PROBE. Two modules, each writing 43 NDJSON-ish lines of ~470 bytes to stdout then `process.exit(1)` — the shape a check's violation batch has. One purely synchronous, no `await` token anywhere. The other opening with `await Bun.file(...).text()`, mirroring a check's preamble. Each run piped to `wc -l`, 40 runs per arm, anything other than 43 recorded as short.

Synchronous, no async read: 2 of 40 short (32, 16), and 5 of 40 in an earlier batch (16, 16, 25, 17, 24). Async preamble: 3 of 40 (16, 22, 16), and 0 of 40 in another batch. Async, redirected to a FILE: 0 of 40.

WHAT THAT CORRECTS. The record this came from states the no-async control as 0 of 40 short and scopes the exposure to "every check with an async preamble". Two independent synchronous batches truncated here. The async read is not the discriminator; the pipe is, so the population at risk is every routed check, and a remedy awaiting a flush only where a preamble exists would leave the rest.

WHY IT IS INVISIBLE. The lost lines are violations, so truncation always errs toward clean. The exit code is computed BEFORE the write and is correct, so a consumer sees exit 1 with a plausible shorter list and nothing marks the loss. `run-check.ts` spawns each check with `stdout: "inherit"`, so in CI that stdout is a pipe.

NOT CLAIMED. Not a rate — the four batches disagree (0, 2, 3 and 5 of 40) and nothing here characterises the variance. Not that any real check has reported a short list. Not that the probe's shape matches any particular check byte for byte; it matches the shape, not a caller.

Raised while ingesting `dirty/skills/agent-harness/findings/exit-codes-and-output-channels.md`, whose July entry named the async read as the cause. Cut; the defect is live and its attribution is not.
