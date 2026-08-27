---
id: e89a414f-0827-5790-9aa5-e1e06f657d7d
page-type-slug: finding
title: "Two continuations in a day answered no block, so a turn was kept going that nothing had stopped"
domain-slug: domain/agent-turn-end
---

# Claim

In the 24 hours to 2026-08-22T18:00Z the interactive halt hook issued two continuations on sessions where no block came before them, against 51 that followed one. A continuation is the hook declining to let a turn end, so one with no block before it means a turn was kept going without the hook having judged its ending illegal. What produces this is not established.

# Evidence

Ran `ops seat hook-decisions --arm interactive --window 24h` on 2026-08-22, window 2026-08-21T17:59:52.092Z .. 2026-08-22T17:59:52.092Z. Verbatim: invocations=924 blocked=60 restated=51 orphan_cont=2. Reasons in the same window: judged-legal 697, judged 60, continuation 53, reading-unsettled 47, not-interactive 67. The headless arm over the same window returned invocations=923 blocked=2 restated=1 orphan_cont=0, so only the interactive arm carries any.

The classification is in `tools/lib/turn-end-tally.ts` lines 28 to 41. Records are ordered per session and each is given a role: `block` where the decision was to block, `restated` where the reason was a continuation and the previous decision on that same session was a block, and `independent` otherwise. `orphanContinuation` counts the `independent` ones whose reason was a continuation. So the two are continuations with no block before them in their own session.

This was noticed while measuring the intent "A turn ends only where the agent is blocked or has handed back", which the hook otherwise upholds: 60 attempts to end a turn illegally were stopped in the same day.

Not measured: whether the two share a session or a seat, whether a block was written and not read back, whether a continuation can legitimately arise with no block before it, and whether the figure holds over longer than a day.
