---
id: a82764e1-fd07-5da3-8970-8704d40999de
page-type-slug: finding
title: "Recorded read outruns delivery"
domain-slug: domain/agent-harness
---

# Claim

A recorded reading can outrun what reached the agent. Where a read's output exceeds what the harness will put in front of the agent, the body is spilled to a file and the read is still recorded as done — so `hold-seat`, `read-what-governs` and `read-before-write` are all satisfied by text the agent never received, and the write they were guarding proceeds.

# Evidence

Observed on 2026-08-06 in the instructions repo. A sweep over 23 sites was refused by `read-before-write` and `read-what-governs` naming 21 files, with the `owed:` line composing the single call that clears them. Run unpiped as `read.ts` requires, the call returned 51.8KB. The harness did not put that in front of the agent: it wrote the body to a file under `tool-results/` and delivered a 2KB preview instead.

The read was recorded regardless. The next `--dry-run` came back clean on every gate, and the write landed. Nothing in the refusal, the record or the verdict distinguishes that run from one where the agent read all 21 files.

The failure is silent in both directions. The agent cannot tell a spilled read from a delivered one without checking the byte count against its own recall, which is exactly the judgment it is least able to make. And the gate cannot tell either, because what it consults is the record, which is written by the reading tool on the strength of having printed rather than on the strength of having been received.

`read.ts` already refuses to print into a pipe, and its refusal names the reason: "nothing was read — this is printing to a pipe, so no body would reach you and a record would have said one had." That is the same defect this describes, caught for one cause and not the other. The pipe case is refused; the too-large case is recorded.

Not measured: how large an output must be before the harness spills it, whether the threshold is stable across harness versions, whether other agents have landed writes on spilled reads, and whether any check could observe the difference after the fact.
