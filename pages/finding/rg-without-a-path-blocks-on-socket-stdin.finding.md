---
page-type-slug: finding
slug: rg-without-a-path-blocks-on-socket-stdin
title: "An rg given no path blocks forever on socket stdin, and its subagent is reported complete anyway"
domain-slug: domain/agent-harness
---

# Claim

An `rg` invoked with a pattern but no path blocks forever instead of searching, because `rg` is a
shell function here that runs the Claude Code binary under ripgrep's name, and an agent's stdin is
a unix socket rather than a terminal, so what runs takes it for input to search and waits on a socket that never delivers and never closes. The subagent
that ran it is reported complete while its shell process is still alive and waiting.

# Evidence

Measured on 2026-08-28 on two Explore subagents dispatched during the findings amnesty.

Both left a process tree alive for 55 and 57 minutes after being reported `completed`. Every
process in both chains showed `utime=0 stime=0` in `/proc/<pid>/stat` — zero CPU — so they were
deadlocked rather than working through a large tree.

The two leaf ripgrep processes sat in `wchan=unix_stream_data_wait` with `fd0=socket:[225429876]`
and `fd0=socket:[225721900]`. Neither command named a path: one was `rg -n --glob '*.md' ... -i
"<alternation>" --sort path`, the other `rg -n "<alternation>" --glob '!node_modules' ... | rg -v
"^pages/finding/" | head -40`. The bash processes above them were in `wchan=do_wait`. In the second
chain the downstream `rg -v` and `head -40` sat in `anon_pipe_read`, waiting on output the first
stage would never produce, so the whole pipeline hung on its first process.

The function body is `( exec -a rg "$_cc_bin" ${1+"$@"} )`, where `_cc_bin` is
`$CLAUDE_CODE_EXECPATH` or `/var/home/walton/.local/bin/claude`. So the process that shows as `rg`
in `ps` is the Claude Code binary wearing ripgrep's name, and the argument handling a caller
expects from ripgrep is not what it gets. It falls through to `command rg` only where that binary
is absent.

The subagents were listed as `completed` throughout and both returned reports.

Not measured: whether the reports those two returned were complete, or were drawn from whatever
searches did not hang — which is the part that matters, since a hung search cannot report that it
found nothing. I did not test whether a path argument fixes it. One of the two subagents reported
afterwards that `timeout` cannot wrap `rg` because it is a function, and that the wrapper also
serves a stale index; I have measured neither. One case of two subagents on one dispatch.
