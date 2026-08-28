---
page-type-slug: finding
slug: piped-stdio-arrives-as-a-socket
title: "A node or bun parent gives its child a socket on fd 0, so a shell cannot tell an ordinary payload from one that never comes"
domain-slug: domain/agent-harness
---

# Claim

A command spawned by a node or bun parent with piped stdio receives a unix socketpair on fd 0, not a pipe, so `[ -S /dev/stdin ]` is true for ordinary payload delivery and not only for the pathological case.

Nothing available to a shell at startup distinguishes a socket carrying a payload already on its way from a socket that will never deliver one.

`rg` given no path argument reads fd 0, and where fd 0 is a socket nobody closes, it blocks with no end.

# Evidence

Spawning `bash` from bun with `stdio: ["pipe", ...]` and asking the child what fd 0 is prints `fd0=SOCKET`, and the written payload arrives whole. This is libuv's `socketpair` behind `"pipe"`, so it holds for every child of every node or bun parent, including the Claude Code status line command.

A guard reading `[ -S /dev/stdin ] && exec 0</dev/null` was landed at `159b80b6` at 08:04:56 to stop the `rg` block. It emptied the status line's payload instead. Across six seats, the `context-tokens` record written from that payload has a last entry at 07:57, 08:03, 08:03, 08:04, 08:04 and 08:04, and none after — the guard was live for sixteen minutes and every seat stopped at once. Taking it back at `d28d3987` brought all six back inside a minute.

The guard was checked before landing against a shell pipeline, where fd 0 is a pipe and the test is false. That check could not have caught this, and the regression it was checking for was never the shape the harness delivers.

Not measured: whether any other consumer of stdin was affected over those sixteen minutes, and whether `rg` blocks the same way on a socket that has been written to and shut down for writing.
