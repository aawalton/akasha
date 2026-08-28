---
page-type-slug: finding
slug: two-replaced-at-functions-resolve-different-pages
title: "Two functions named replacedAt resolve different pages, and a subagent's epoch is never written"
domain-slug: domain/read-record
---

# Claim

`replacedAt` is two functions resolving two different pages. `agent/read-record.ts:178` takes a page path and reads `context-replaced` from the sidecar beside the writer's own page, which for a subagent is its own. `tools/lib/epoch.ts:24` takes an agent id and goes through `tools/lib/seat-record.ts:19`, which resolves only a seat page. `tools/lib/read-record.ts:69-72` uses both at once: the records come off the subagent's page and the cutoff deciding which of them still count comes off the seat's.

# Evidence

Read 2026-08-28 at `ff99cd48a4`.

    agent/read-record.ts:178  replacedAt(page: string)   -> replacedBy(page)?.at ?? 0
    tools/lib/epoch.ts:24     replacedAt(agent: string)  -> epochOf(agent) … .at

`replacedBy` at `agent/read-record.ts:167-176` reads the sidecar beside whatever page it is handed, and `agent/record-read.ts:123-125` hands it `agentPageFor(writer)`, which at `:125-133` answers `agent/subagent/<seat>--<own>.subagent.md` where the writer id carries the mark. `epochOf` goes through `seatRecordOf` at `seat-record.ts:17-20`, whose `seatPageForAgent` indexes `seatPagePaths()` alone, and `SEAT_PLACES` at `tools/lib/agent-page-place.ts:13` is `agent/seat` and nothing else. It can never answer a subagent page.

The two meet inside one expression:

    69 function held(agent: string): Records {
    70   const page = agentPagePathFor(agent)
    71   return page === null ? {} : recordsFor(page, replacedAt(agent))
    72 }

`agentPagePathFor` at `tools/lib/agent-page.ts:5-10` answers the subagent's own page first and the seat's only as a fallback; the `replacedAt` imported at `read-record.ts:20` is the `epoch.ts` one. `recordRead` at `:80-82` pairs them the same way.

`recordEpoch` at `epoch.ts:15-16` is the only writer of `context-replaced` outside `dist/`, and it writes through `keepSeatRecord`, which returns at `seat-record.ts:30-31` where the page is null. So for a subagent id nothing is ever written, while `agent/read-record.ts:170` looks for that key beside the subagent's page. The `SessionStart` hook at `tools/hooks/agent-hook-record-epoch.agent-hook.code.attachment.ts:15-19` takes `recordingAgentId`, which spells `<seat>--<subagent>` at `tools/lib/read-record.ts:49-54`, then calls `recordEpoch(agent, source)` and `resetReadings(agent, replacedAt(agent))`. For a subagent both are no-ops: nothing is written, `replacedAt` answers 0, and `resetReadings` returns at `agent/record-read.ts:95`.

Not measured: whether a subagent's readings standing past a context replacement has admitted a write it should not have.
