---
id: 8f132959-4fcd-5011-8e19-d51ca06b84d4
page-type-slug: finding
title: "No reliable order for send and revive"
domain-slug: domain/agent-harness
---

# Claim

There is no ordering of `ops seat send` and `ops seat revive` that reliably puts a question to a stopped seat.

# Evidence

Met firsthand on 2026-08-06, twice, against seat `019fd43b`.

Send before revive is refused outright: `recipient 'claude-agent-harness-developer-17946' resolves to a provably-dead worker (project #17946); refusing to enqueue to a dead inbox — the message would be silently lost.`

Revive before send races. `ops seat revive` returned `revived` and `ops seat send` returned `pending live`. The seat's own transcript shows it woke to `Continue from where you left off.`, replied `No response requested.`, and stopped again. My message appears nowhere in its log. `ops seat send --help` states the reason: the message is enqueued via the orchestrator REST path and returned with a `pending` status, delivery being asynchronous, and `pending` is a fact about the row rather than about delivery.

What worked was three steps: revive, confirm the row reads live with `ops seat list`, then send into that window. Nothing names that sequence anywhere I could find.

Why this is worth a row of its own rather than a note on the project it came out of. `domains/tasks/lead/verify-handback.md` was changed earlier the same day, by me, to instruct a lead to revive the seat that handed work back. For the case that line was written for there is no gap, since `ops project move-to` files the return reason on the row and a revived seat boots into it. The gap is the conversation after the return, where a lead has a question rather than a verdict, and that is the case this was met in.

Not established: whether a longer wait between revive and send closes it, whether the wake payload could carry the message, and whether other callers of `revive` have hit it. One caller twice is a case rather than a rate.
