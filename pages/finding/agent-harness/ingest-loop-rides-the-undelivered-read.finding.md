---
id: 952dfa62-cfc6-52f6-9915-167f27a870b3
page-type-slug: finding
title: "Ingest loop rides the undelivered read"
domain-slug: domain/agent-harness
---

# Claim

The `ingest-instructions` loop cannot empty a source larger than a seat's context except by relying on the recorded-but-undelivered read that `agent-harness/recorded-read-outruns-delivery.md` reports as a defect. The loop directs a seat to read only the block it is deciding, and `read-before-write` refuses every cut against that file until the whole of it is recorded as read. Closing the spill hole would stop this task on exactly the sources it was written for.

# Evidence

Measured on 2026-08-07 ingesting `dirty/skills/agent-harness/findings/seat-liveness-halting-and-stalls.md`, 1099 lines and 71521 bytes, dispatched with an explicit instruction not to read it whole.

The loop's own step 1 says to take the lowest undecided block, and its step 3 says to cut it. Both cut verbs refuse first. `ops instructions edit` and `ops instructions write` each returned `[read-before-write] fail — read 2026-07-30 12:25:24; the file changed 2026-07-30 12:25:24; unread from line 1 of 1099`, with an `owed:` line naming one call to `tools/read.ts`. The refusal is identical for both verbs, so there is no cut route around it.

`read.ts` refuses to print into a pipe, so the body cannot be discarded on the way. Run unpiped it returned 77.6KB, which the harness spilled to `tool-results/` and replaced with a 2KB preview. The read was then recorded: the next `edit` dry-run passed every gate and the cut landed as `1feabce9c2`.

So the sequence that made the task executable is the one the standing finding names as the hole — the gate satisfied by text the agent never received. Five further cuts landed the same way.

This does not dispute that finding, which is correct and better measured than anything here. It records a consumer of the behaviour. A repairer who makes `read-before-write` require delivered rather than recorded text closes a real hole and simultaneously stops every seat dispatched onto a large `dirty/` source, and nothing at either site names the other. Around forty seats were running this task concurrently.

Not established: whether a smaller ceiling on the loop's own block-taking, or a cut verb gated on the touched span rather than the file, would resolve it. Both are designs and this is an observation.
