---
id: 6c78add4-22e1-5ab5-ae82-3128f1c5cccd
page-type-slug: finding
title: "Halt hook coverage narrower than registration"
domain-slug: domain/agent-harness
---

# Claim

The halt hook does not run for at least one headless seat it is registered for, so its coverage is narrower than its registration says.

# Evidence

Reported by seat `019fd43b` (`claude-agent-harness-developer-17946`) about itself, while verifying project #17946: its transcript carries zero genuine `stop_hook_summary` records, against 128 of the 305 transcripts touched in the same 24 hours that carry them. The seat is headless, its recorded mode is `headless`, and `block-headless-halt.sh` is registered in `settings/agents.json`. That reading is its measurement.

Verified myself: `~/agents/hook-decisions/` holds 7,774 decision records over five days, and a grep across all of them returns zero records of any kind for agent `019fd43b`.

This is not the same as the `retired` and `stopped` arms returning nothing. Those fire only where a row is already terminal under a seat still taking turns, so an empty count is their normal condition, and `retired` has fired zero times across the same 7,774 records. Here the hook is not invoked for the seat at all.

`ops seat halt-census` reads legitimacy off the hook's own record, so a seat with no records lands in `unestablished` rather than charged. The census I ran reported 43 unestablished against 350 turn-ends, the whole of that basis `hook-unanswered`.

Not established: how many seats are affected, or whether the cause is registration scope, an exemption arm, a wrapper emitting no Stop event, or something else. One seat is a case rather than a rate.
