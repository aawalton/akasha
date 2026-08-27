---
id: 7ba69f93-2074-5e1d-93d1-296837c613e4
page-type-slug: old-ops-command
title: "Ops seat stop"
slug: ops-seat-stop
domain-parent-slug: domain/ops-seat
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/seat/stop.ts
path: seat stop
---

# Definition

- **Ops seat stop** — a seat's supervisor killed and its page taken, the caller's own seat by default.

# Help

Stop a running agent addressed by any identifier shape, taking its seat
page. Idempotent.

The <agent-id> positional accepts a full UUID, any 8+ character prefix of
the agent's `pages.id` (UUIDv7), or the agent's kebab-case `name` (set via
`ops seat set`) — the same grammar every seat command
takes. The input is resolved to the canonical agent id first,
then the seat page standing for that id is read for the supervisor it
names, so an agent whose name was never set or later changed is still
stoppable.

IT IS OPTIONAL AND DEFAULTS TO SELF ($AGENT_ID), so a seat ends its own
turn with a bare `ops seat stop` — a seat knows it is finished without
knowing its own id, and having to look one up is what turns a finish into a
halt. Stopping a seat whose subagents are working is REFUSED: they run inside
the process this kills and end with it, and nothing reports what they were
doing. Wait for them to return, or pass --force to end them with the seat.

Either path SIGTERMs the discovered pid(s) and, for any that survive the
grace window, escalates to the un-trappable SIGKILL — so a supervisor hung
in its shutdown handler is still killed rather than left live behind a
page that no longer stands (#13604).

Three paths, by what is found alive:
  • processes carry the agent id in `/proc`: they are SIGTERM'd→SIGKILL'd,
    tearing down the supervisor and its `claude` child. Status `stopped`.
  • nothing carries it but the seat has a name: its tmux session is ended.
    Status `stopped`, or `already-exited` where no session stood.
  • nothing carries it and it has no name: nothing is signalled and the
    seat is reconciled. Status `reconciled`.

AND THE SEAT'S PAGE GOES, once the process is provably gone. A seat's page
stands while an agent is present in it, so a page left standing is read as a
running seat by everything downstream. The supervisor takes its own page in
its shutdown handler, but a supervisor killed rather than asked never reaches
that handler, and one already dead never ran it — which is why the removal is
repeated here rather than left to the hourly sweep.

A stop does not refuse a later revive. The supervisor's boot-time
child-reconcile records a proven-dead child's exit and never relaunches it,
but a seat in the recipient-resolver's armed set is revived by inbound work
matching one of its wakeSources, because a stopped seat's page does not
stand and that is what absent means. `ops seat resume` is the deliberate act
that brings one back by hand, and it is available on every stopped seat:
THIS IS THE ONLY WAY
A SEAT ENDS. There is no second, stronger finish — whether a seat should come
back is judged when somebody wants it back, by whoever wants it, rather than
declared in advance by whoever last left it.

Default stdout (TSV, one line):
  <agent_id>\t<name>\t<stopped|already-exited|reconciled>

--json stdout (stable shape):
  {"agent_id": ..., "name": ...|null, "pid": ...|null, "signaled": <bool>, "status": ...}

Note: `agent_id` / `name` in the output are the RESOLVED values (not the
caller's input shape).
