---
id: 00235ad4-8901-5254-b43c-d17ad72b8008
page-type-slug: finding
title: "Defer ceiling comment inverted"
domain-slug: domain/agent-fleet
---

# Claim

The doc comment on the supervisor's default max-defer ceiling says the CLI restart path passes no ceiling and stays unbounded, where that path passes both bounds and two comments in the calling file say so.

# Evidence

Read at `~/code` on 2026-08-07 at `383bf60d`, while emptying a quarantined question document that raised it. That document is queued for removal.

`supervisor/src/supervisor-deferred-restart-decide.ts:54-62` documents `DEFAULT_REEXEC_MAX_DEFER_MS = 1_800_000`, and its last sentence reads: "The CLI `restart_preserve_on_idle` path passes no ceiling and stays unbounded."

The handler for that action does the opposite. `supervisor-agent-action.ts:328-336` logs "Received restart_preserve_on_idle ... arming idle gate" and calls `armIdleGate` with both bounds — `maxDeferMs: resolveMaxDeferMs(...)` off `SUPERVISOR_REEXEC_MAX_DEFER_MS`, and `staleWedgeMs: resolveStaleWedgeMs(...)` off `SUPERVISOR_DEFERRED_STALE_WEDGE_MS`.

Two comments in that same file state the inverse of the constant's sentence directly. At `:215-219`, on the shared arm: "The two callers differ ONLY in the bound config: the CLI arm passes a max-defer ceiling + a proven-stale wedge discount (#15282) so an honestly-busy-off-a-hung-request seat still un-wedges; the pre-cliff arm passes NEITHER". At `:73-74`, on the pre-cliff arm: "It carries NO max-defer ceiling and NO stale-wedge discount". So the property the constant attributes to the CLI path belongs to the other caller, and the file that owns both callers says which is which.

The comment beside the call site also records why the bound exists — `:321` cites two same-day wedges (a 34-minute one among them) as what an unbounded defer produced.

What makes this worth recording rather than obvious is the direction. The stale copy is the one a reader meets first: someone opening the constant to check its default reads the false sentence in the same breath as the correct number. The surface that had it right, `packages/agents/supervisor/CLAUDE.md`, is no longer in the code repo — the whole head document is quarantined in the instructions repo — so the correct account is now readable only from the caller.
