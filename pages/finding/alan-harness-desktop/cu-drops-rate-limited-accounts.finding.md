---
id: 0e2cf3c0-07b4-53e4-b396-0d651befa4f3
page-type-slug: finding
title: "Cu drops rate limited accounts"
domain-slug: domain/alan-harness-desktop
---

# Claim

The `cu` shell function's human display path silently drops any Claude account whose live usage fetch returns a 429 instead of falling back to its cached row, so the number of accounts Alan sees varies run to run even though none of the 7 accounts are actually disabled.

# Evidence

Filed as project #15877, domain `alan-harness-desktop`, status `someday_maybe`.

Symptom: Alan saw only 3 of 7 claude accounts in the `cu` shell function. The count floated run-to-run (observed 1, 3, and 5 of 7).

Root cause: `cu`'s human display path, `runDefaultMode` in `packages/infra/scripts/src/claude-usage.ts`, does a live `/api/oauth/usage` fetch per account and silently drops any account whose fetch does not return 200 (`if (!usage) continue`). The usage endpoint was rate-limiting the fleet — a varying subset returns HTTP 429 each run, swallowed by `getUsages`' `catch { return null }`. Not subscription-disabled (all 7 rows `subscriptionDisabledAt=null`), not token expiry (tokens fresh).

Live evidence (2026-07-24): 7 rows in DB, none disabled. One diagnostic run: 200 OK for 5 accounts, 429 for alanwalton + amywalton. A prior `cu` run showed only 1 account.

Alan's directive: instead of dropping failed accounts, show the most recent cached info. Cached values already exist on every claude-account row (`fiveHourUtil`/`sevenDayUtil`/resets), the same source `cu --json` and the statusline read via `getClaudeAccountPacing()`. Only the human `cu` path does live fetches and drops on failure.

Fix approach recorded: load the pacing map up front; keep the live fetch + writeback, but on null render from the cached row instead of `continue`.

Refinement recorded ("Honest surfaces" principle): mark cached-fallback rows (e.g. `~`) so stale is visibly distinct from fresh. Precise staleness age needs `pacingUpdatedAt` (written by `pushPacingToDb`, not decoded onto `AccountState` by `attrsToAccountState`); marker-only needs no new plumbing.

Secondary note, not the ask: 429s come from many pacing consumers hammering the shared endpoint (hourly loop, 5-min supervisor snapshot, `cu` itself). Cached-fallback is the fix; cutting 429 frequency is a separate optional follow-up.

Throwaway diagnostic used: `/tmp/cu-diag.ts`.

No `# Objective` — captured, never defined.
