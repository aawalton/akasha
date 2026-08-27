---
id: 002108b1-9d4b-5b3d-9793-586890035ae3
page-type-slug: finding
title: "Parallel reads do not all record"
domain-slug: domain/agent-harness
---

# Claim

Reading several documents in one tool block records only some of them, so the read gate refuses the next command for documents the agent did read.

# Evidence

Reported 2026-08-15 by a review delegate: "Parallel `Read` calls do not all record. Reading four documents in one tool block left three of them unrecorded and the gate refused my next Bash call. Reading one per block worked. That cost several turns."

A second delegate hit the neighbouring case from the other side: re-reading a document the gate lists as unread returns "Wasted call — file unchanged since your last Read" and records nothing, so the refusal cannot clear. Passing `offset`/`limit` forces a fresh serve and clears it.

Both are the same failure to an agent standing in it: the gate names a document, the agent reads it, and the gate names it again. Nothing distinguishes "your read did not record" from "you read the wrong path", which is where the time goes — the second delegate spent its turns looking for a path-spelling bug that was not there.

Not measured: whether the loss is in how the tool block dispatches, or in how the recorder writes. Both delegates found the same workaround shape, which is that a read has to be the only thing in its block.
