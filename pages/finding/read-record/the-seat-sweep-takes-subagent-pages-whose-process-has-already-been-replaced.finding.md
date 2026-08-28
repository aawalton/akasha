---
id: 96c15790-869a-5099-8cc2-ce84b11e0966
page-type-slug: finding
title: "The seat sweep takes subagent pages whose process has already been replaced"
domain-slug: domain/read-record
---

# Claim

The `SessionStart` sweep that removes every subagent page under a seat has, in every occurrence that can still be checked, fired at the start of a *new* claude process for that seat. A delegate runs inside its seat's claude process and cannot outlive it, so at the instant the sweep runs its pages belong to delegates that were already gone. On this evidence the sweep is clearing leaked pages rather than taking live ones, and the record it takes was unusable before it took it.

# Evidence

Measured 2026-08-28 05:40 by matching sweep commits against process start times of the claude processes still running.

    5440b08b23  08-28 02:47:31  astra started again, so the 5 subagent page(s) standing under it go
    pid 2319344 AGENT_ID=01a04357-3025-7000-b40c-ef42fdbc377e  started 08-28 02:47:28

    4e8171c054  08-28 00:15:14  thea started again, so the 3 subagent page(s) standing under it go
    pid 1069884 / 1069097                                      started 08-28 00:15:11

Both sweeps stand three seconds after a claude process for that seat began. Those are the only two of the four sweeps of that night whose process is still alive to read a start time from.

`pgrep -x claude` returns seven processes and seven distinct `AGENT_ID` values, so one claude process per seat. Two on one seat is refused rather than left to chance: `tools/lib/seat-supervisor-claim.ts:77-85` throws `SeatSupervisionCollisionError` when the seat page states a `supervisor-process` that `/proc` reads as present.

Delegates run inside the process. `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS=50` and a delegate's own bash calls carry `CLAUDE_PID` equal to the seat's claude pid, so nothing dispatched by that process survives it.

`SessionStart` does not fire per delegate in this version: between 05:00 and 05:36 on 08-28 there were about thirty `a subagent states the kind it was dispatched as` commits under `astra` and no `started again` commit at all.

Not measured: the two sweeps of 08-27 20:29 and 20:33, whose processes are gone. Not measured: whether a `SessionStart` whose source is `clear` can reach a seat here, which is the one source that fires without a new process and is not in `PROCESS_SURVIVES`.