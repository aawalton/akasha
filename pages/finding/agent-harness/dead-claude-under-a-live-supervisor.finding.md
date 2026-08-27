---
id: b256b0ec-81be-5b3a-af5f-a5070c159558
page-type-slug: finding
title: "A seat's Claude can die under a live supervisor while every liveness reading says healthy"
domain-slug: domain/agent-harness
---

# Claim

A seat's Claude process can exit while its supervisor stays alive, and every liveness reading says the seat is healthy. The row says `running`, `ops seat alive` probes the supervisor pid and answers `live`, and messages enqueue against it and are never taken. The seat sat twelve hours in that state, holding a project at `checks`, and nothing reported it. `ops seat restart` cannot recover it — the supervisor takes no action off the channel — and `ops seat revive` refuses it as already live.

# Evidence

Measured 2026-08-18 on `readout-system-worker-19349`, agent `01a01244-9c37-7fb1-a1d2-5f40cfbde3e0`, holding #19349 at `checks`.

Its transcript stops at index 657 on 2026-08-18T00:50Z, where it sent its hand-back and parked on the reply. `/var/home/walton/agents/01a01244-9c37-7fb1-a1d2-5f40cfbde3e0/spawn.log` was last written at 02:08 and ends with Claude's own exit banner, "Resume this session with: claude --resume". So the inner process was gone by 02:08.

At 13:00, twelve hours later: the row read `running`; `ops seat alive` answered "live — row supervisorPid alive and present in the env-keyed /proc set"; supervisor pid 306053 and its pty-proxy 306000 were both in `ps`. `ops seat active` reported `wedged: 0` and gave this seat `io: advancing`, which is the reading that most contradicts what was there.

A ruling sent at 13:0xZ sat at `not-yet/unclaimed` across two checks four minutes apart. `ops seat restart --agent-id` exited 3: "supervisor did not consume requestedAction within 30000ms (lastDispatchStatus=restart_pending)". `ops seat revive` exited 2: "already live — stop it first".

`ops seat stop` did work, and `ops seat revive --verify --grace 60s` then returned `revived advancing`, after which the same ruling read `INJECTED`. So stop-then-revive is the recovery, and nothing points a caller at it: both verbs that were reached for refuse with a message about the other.

`ops seat blocked-census` carried the seat as `unrecorded — nobody named a holder`, which is correct and is also the only surface that hinted at it. That arm cannot separate a seat that never recorded a holder from a seat whose process died, and its own help warns against reading the list as broken seats.

NOT MEASURED. Why the inner process exited — the log tail is terminal escape output rather than an error. How often this shape occurs; one instance is all that was measured. Whether the 02:08 write and the 00:50 transcript stop bound the same event.
