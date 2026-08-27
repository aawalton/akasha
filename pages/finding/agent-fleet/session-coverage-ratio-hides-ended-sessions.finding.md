---
id: cb2a2827-8931-5466-b15e-497921e3004e
page-type-slug: finding
title: "Session coverage ratio hides ended sessions"
domain-slug: domain/agent-fleet
---

# Claim

The stall sensor over the hourly confirmation stream declares that its turn corpus undercounts, but the number it prints cannot show the larger half of that undercount: a session that has ENDED is skipped before it is counted, so it is absent from both sides of the `sessions read/found` ratio and a complete-looking `38/38` is what a gap in coverage looks like.

# Evidence

Measured 2026-08-08 while ingesting `dirty/code/packages-alanwalton-daily-tracking-cli-docs-hourly-confirm-stall.md`.

`bun ops tracking hourly-confirm-stall --dry-run --json` printed, on a live workstation:

    {"decision":"quiet","why":"within-threshold","progress":"3h of 24h","sessions":"38/38"}

`sessions` is the only coverage figure in the envelope, built at `packages/alanwalton/daily-tracking-cli/src/hourly-confirm-stall.ts:125-127` from `sessionsRead` over `sessionsFound`.

Both come from `packages/agents/shared/alan-turns-workstation.ts`. `scanWorkstationSessions` walks the agents root and at line 87 runs `if (sentinel === null) continue` — a directory carrying no current-session sentinel is skipped before anything is pushed onto `reads`. `reduceAlanTurns` then sets `sessionsFound = scan.reads.length` at line 110. A session whose sentinel is gone enters neither number.

The bound is declared in prose in three live places: `src/lib/hourly-confirm-stall.ts:186-189` ("a session that ended or compacted takes its turns with it"), the header of `alan-turns-workstation.ts`, and `packages/agents/shared/attention-transcript.ts:20-34`. None reaches the envelope.

The two halves behave differently, which is what makes the number misleading rather than merely incomplete. A COMPACTED session keeps its sentinel and fails the read, so `readInbounds` returns null, `readable.length` falls, and the ratio shows it as `35/38`. An ENDED session shows nothing.

The consequence is on the `no-open-block` threshold, which fires on three distinct clock-hours holding one of Alan's turns (`ledgerDarkActiveHours: 3`, `lib/hourly-confirm-stall.ts:52`). Hours whose sessions have ended contribute zero turns, so the sensor undercounts toward silence while its envelope reads `38/38`.

NOT MEASURED: how many directories hold a session ended within a three-hour window, so the undercount is unquantified.
