---
id: 9992d11b-1bda-53db-8620-cee7b1d51ece
slug: seat-identity-unrecorded
page-type-slug: finding
title: "Seat identity unrecorded"
domain-slug: page-type/role
---

# Claim

A seat's identity is stamped onto its agent row once at name-bind and never re-read, so the row is a cache with no refresh. #17523 swept every stale value, but a persona moving domains tomorrow reopens the same gap and nothing installed would notice.

# Evidence

Measured across three re-measurements on 2026-08-02, the last after #17523 landed.

**The instance is closed.** All three live seats now agree across both verbs:

    athena-lead   row agent-harness   corpus agent-harness
    vera-lead     row schema          corpus schema
    amy-lead      row alan-harness    corpus alan-harness

Before it, `athena-lead`'s row read `unknown` and `vera-lead`'s read `instructions-harness` — a real domain that is not hers, which is worse than an absence because nothing about the reading says to doubt it. Both were snapshots of a corpus that moved: `instructions-harness` narrowed its scope that day and vera moved to `schema`.

**The mechanism is not closed, and that is the claim.** #17523 re-sourced the default from the persona corpus and re-stamped 2,862 rows, and a re-run of the backfill reads `would-patch 0` over 9,423. But `setAgentName` still writes the row once at name-bind and nothing re-reads it afterwards. The backfill was a broom rather than a fix — it corrected every value standing at that moment and installed nothing that would catch the next one.

So the gap reopens on the ordinary act this estate performs regularly: a persona changing domains, a domain being renamed, a domain narrowing its scope. Each leaves every already-bound seat holding the old answer with nothing comparing it to anything, which is exactly the state that stood before the sweep.

The build seat reported this itself rather than letting a green row imply the objective was met. No comparator was cut, deliberately — `personas/` holds that a departure from a persona's default is legitimate, so a refusal would be wrong, and re-sourcing removes the drift's mechanism at bind time rather than detecting its symptom. What remains unbuilt is anything that re-derives a bound seat's row when the corpus beneath it moves.
