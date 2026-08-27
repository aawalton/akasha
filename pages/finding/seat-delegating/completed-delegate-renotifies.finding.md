---
id: f2e82c81-6523-59e8-927c-aa1609752b76
slug: completed-delegate-renotifies
page-type-slug: finding
title: "A finished delegate keeps notifying its parent"
domain-slug: domain/seat-delegating
---

# Claim

A subagent that has completed and handed back keeps firing completion notifications at its parent. One agent has notified six times for one finished task, each arriving as a turn the parent must spend.

# Evidence

One delegate was launched, stopped when its parent process exited, resumed by message, and completed. It reported its work once at 395s. It then notified again at 476s, 653s, 686s, 766s and 853s — six notifications for one task, the last five carrying no new work.

The agent named each repeat correctly: they were stale waiters left over from phases that had already reported. So the agent side knows the work is done; what persists is a waiter per phase, and each fires on its own.

The cost falls on the parent. Every notification is delivered as a turn, and a turn spent on a stale waiter is a turn not spent on the work. The parent cannot tell a stale repeat from a real completion before reading it, so it cannot be ignored cheaply either. Where the parent is mid-conversation with a person, each repeat also arrives as an interruption carrying an explicit warning not to read it as that person's input.

Observed under `subagent_type: general-purpose` with `run_in_background`, on an agent that had been resumed via SendMessage after its parent restarted. Whether the resume is what leaves the extra waiters behind, or whether a delegate that runs long enough accumulates them regardless, is not established here.
