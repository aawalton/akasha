---
id: 5002709d-f41a-5b73-a791-e785a8302e75
slug: seat-waits-on-a-row-with-no-seat
page-type-slug: finding
title: "Seat waits on a row with no seat"
domain-slug: domain/agent-harness
---

# Claim

A seat can wait forever for a child row that has no seat on it, and every liveness signal reads normal while it does.

A seat that hands back and stops is the ordinary shape, so a row returned to an earlier status after its seat has gone is a state a tree reaches by design. A parent polling for that row to come back is then waiting on something nothing will produce.

# Evidence

Met 2026-08-13 on the ring tree, #18969 with children #18970, #18971 and #18973.

The manager waited for two children with a foreground bash loop — `while true; do ... sleep 45; done`, exiting only once both rows read `awaiting_manager_verification` or `awaiting_manager_deployment`. #18973's seat had handed back, been verified, and stopped. Branch CI then failed on that project's paths, the manager returned the row to `checks`, and the return reached nobody. The loop's exit condition was unreachable from that moment. It sat in it for over forty minutes holding the whole tree, and `ps --ppid` showed the bash child with the elapsed time to match.

Nothing reported it. The process was alive, the seat's log file mtime had moved when the wait began, and `ops seat list` read `running live` throughout. What distinguished it from a working seat was visible only by walking the process tree and reading the loop out of a command line. The seat's own log tail was identical across two checks half an hour apart, which is also what a long build looks like — and a long build was the reading I took first, because the manager had announced one four minutes earlier.

`Bounded Wait` on `domains/code-quality.md` names this failure exactly. It binds code, and this wait was a shell loop a seat improvised at the moment it decided to wait.

Separately: a blocked seat cannot receive a message. `ops seat send` accepts, queues and reports success, so the ordinary remedy for a stuck seat reads as delivered while reaching nobody until the block clears. Resolved instead by spawning a seat onto the seatless row, which let the row move and released the poll without touching the manager.
