---
id: a5f3ab57-9ce9-5d23-95a4-6253a94205db
slug: terminal-verdict-cleared-by-retry
page-type-slug: finding
title: "A renewal that merely failed clears the record that an account's login is dead"
domain-slug: domain/claude-account-upkeep
---

# Claim

A renewal that merely failed clears the record that an account's login is dead.

# Evidence

`renewalTerminal` is read off `lastRefreshOutcome === "terminal"` on the row, in `tools/lib/oauth-db-decode.ts`, and off whether `terminal-at` stands on the page, in `tools/lib/oauth-page-db.ts`. `tools/commands/claude-account/census.ts` turns it into `needs-login` against `renewable`.

`categorizeRefreshOutcome` in `tools/lib/oauth-account-health.ts` answers `ok`, `terminal` or `retryable`, and `writeRefreshHealth` writes that answer to `lastRefreshOutcome` every pass. A 500 from the token endpoint therefore replaces `terminal` with `retryable`, and the account reads as renewable again on the next census, without anybody having logged in.

`writeTerminalHealth` writes `terminalAt`, which nothing clears, so the row holds both a latch that never lets go and a verdict that a single failure resets. The two disagree from the first retryable failure after a terminal one, and each has its own readers.
