---
id: aa9da871-1a6b-5b74-9e03-2479c0c94df8
slug: turn-end-stops-headless-seat
page-type-slug: finding
title: "Turn end stops headless seat"
domain-slug: domain/agent-turn-end
---

# Claim

`domains/agent-turn-end.md` states in Design that a turn ending does not stop the seat, and for a headless seat the halt guard now stops it at two of its turn ends rather than one. The line is written as a Departure — it exists to stop a reader assuming the opposite — so where it is false it is false in exactly the direction that misleads.

# Evidence

`tools/lib/headless-halt-wake.sh` runs `[[ "$_mode" == "headless" ]] && ask stop` on its `held-wake` arm and, since #18556 shipped on 2026-08-10, on its `work-complete` arm as well. `ask stop` calls `ops seat stop`, so the seat is stopped at that turn end and not merely left resident.

Observed rather than read: `claude-code-check-lead-verify-handback-18348` ended a turn at 2026-08-10T23:40:14Z, the guard recorded `{"decision":"allow","reason":"work-complete"}`, and `ops seat list` now reports that seat `stopped` and `dead`. Eight further seats were stopped on `held-wake` in the half-hour before it.

The tension predates #18556 — the `held-wake` arm has stopped seats for longer than that — so this is not a line that project made false. What it did was widen the population the line is false for, from one verdict to two, which is why it is filed now rather than left.

WHAT THIS FINDING DOES NOT DECIDE: whether the line is wrong or merely narrow. It may be that the stop is the guard's act rather than the turn ending's, and the line means only that ending a turn is not itself an ending of the seat — in which case what is missing is the distinction rather than a correction. That reading is available and the line does not carry it, which is the whole of what is observed here. A Design line cannot be changed without Alan seeing it, so nothing was repaired.
