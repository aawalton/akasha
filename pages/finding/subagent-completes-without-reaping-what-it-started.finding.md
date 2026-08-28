---
page-type-slug: finding
slug: subagent-completes-without-reaping-what-it-started
title: "A subagent is reported complete while the processes it started are still running, and nothing reaps them"
domain-slug: domain/agent-harness
---

# Claim

A subagent is reported `completed` while shell processes it started are still running, and nothing
reaps them. Its completion notification does not fire until those processes end, so an agent whose
command never returns is reported finished and then reports a second time, much later, when
somebody kills what it left behind.

# Evidence

Measured on 2026-08-28 on two Explore subagents dispatched during the findings amnesty.

`ListAgents` showed both as `completed`, and one had already returned a report I acted on. Their
bash process trees were alive 55 and 57 minutes later — eight processes across the two, all at
`utime=0 stime=0`, waiting rather than working. Killing all eight by hand was what produced their
completion notifications, which arrived within seconds of the kill and read as ordinary task
results.

The cause of the hang that day was a command reading a socket nothing would ever write to, which
is fixed at `159b80b6`. The reaping is a separate matter: nothing ended those processes but me, and
nothing would have, since the harness already considered the agents done.

Not measured: whether any process is reaped when its subagent's parent session ends rather than
persisting past it, and whether this leaks beyond the two cases seen. Both of these hung on one
cause that is now fixed, so I have no example of the leak from any other cause, and one is needed
before the size of this is known.
