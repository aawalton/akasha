---
id: 70a61ae7-a979-501e-b600-2add96be772b
slug: quiet-inbox-skips-exit-record
page-type-slug: finding
title: "Quiet inbox skips exit record"
domain-slug: domain/global
---

# Claim

The `stale-live` exit record is gated on matching pending inbound, so a persona seat the wake-watcher can reach, whose process a probe proved dead, is left with no `agent.exit` record whenever its inbox is quiet. Crash forensics ride on the revive-candidate path rather than on the death.

# Evidence

Read `packages/agents/supervisor/src/wake-watcher-tick.ts` whole against `~/code` on 2026-08-07; I did not record the sha.

`processSpec` probes a non-dormant row at `:352-355` and sets `isProcessDead` from `readsProvenDead`. It then builds `shouldRevive` at `:375` from `inbound.some(...)` over `decideWakeMatch`, and returns at `:381` on `if (!shouldRevive) return`. `recordStaleLiveDeath` sits below that return, at `:421`, inside the `deathMode === "stale-live"` leg. So a proven-dead process with no inbound matching a wake source never reaches the write, and the site's own log line names the condition it does fire under: "stale-live crash for '...' with matching inbound — recording agent.exit, NOT reviving (never-auto-restart)".

The neighbouring report is not gated the same way and shows the distinction was available. `deps.reportUnaccountedInbound` is called at `:390`, ABOVE the return, and its comment says why: "Reported on EVERY evaluation, including the negative, so the daemon's bound resets when the seat becomes readable again; reporting only the bad case would latch one episode forever and reproduce the silence one layer up." The daemon states its own scope at `:361` — "This shell now has exactly ONE job: REVIVE a dormant OR stale-live/process-dead row on matching inbound" — which is what makes the forensics a side effect of that job rather than a separate one.

This is a different gap from `pages/finding/agent-life/headless-deaths-single-site.finding.md`, which stands and is correct. That finding is about which SEATS the three exit-record sites can resolve at all, and says the wake-watcher never reaches a `worker-`, `project-` or `deliver-` row. This one is about a seat the watcher does resolve: being reachable is not sufficient, because the record is levied on the inbox rather than on the death.

Filed rather than kept as instruction: there is no act to specify, only a fact about when the fleet records a death.
