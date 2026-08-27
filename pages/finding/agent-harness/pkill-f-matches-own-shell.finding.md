---
id: dd701e35-d0ab-5c41-8083-d78954d66d0c
page-type-slug: finding
title: "Pkill f matches own shell"
domain-slug: domain/agent-harness
---

# Claim

`pgrep -f`/`pkill -f <pattern>` match against the full command line of the process running the search itself, so a kill list built from that pattern can include the caller's own subshell, and killing it sends SIGTERM to the caller's own parent process -- for an agent, its own session -- with the bracket trick (`[c]apture-proxy`) not preventing this specific case.

# Evidence

Project #16414 (someday_maybe, agent-harness). Captured but never defined -- no objective was written; moved off the row's retired `notes` attribute on 2026-08-15.

Defect: `pgrep -f`/`pkill -f <pattern>` match full command lines, including the shell running the pgrep itself, since the pattern appears there as a literal argument. A kill list built that way can contain the caller's own subshell; killing it SIGTERMs its parent -- for an agent, its own `claude` session.

Two independent instances, same night, same session pair. worker-16279, cleaning a released specimen: `pgrep -f 'w16279-cap/capture-proxy'`, killed the result -- matched its own subshell, exit 144, SIGTERMed its own session (AGENT_ID confirmed matching); session survived. nimue, hours earlier: `pkill -f "bun capture-proxy.ts"` gave exit 144; a pid-loop variant gave exit 144 again; explained as "pkill matching its own shell," told Alan the proxy was stopped and the 144s were benign -- true mechanism, no consequence drawn: two exit-144s said twice a kill went somewhere unintended.

Worse than the rest of its family: other instances that night produced a wrong sentence; this fed `kill` rather than `echo`. A different process layout terminates a session mid-work or reaches another agent.

Obvious fix insufficient: the bracket trick (`[c]apture-proxy`) stops grep matching its own grep process, not this -- the calling shell's cmdline still holds the literal pattern; worker-16279 watched it match again next listing. Only safe kill list: explicit pids plus an argv guard checked immediately before each signal; never derive one from a pattern your own command line contains.

Suggested guard (not binding): a PreToolUse hook refusing `pkill -f`/`killall`, flagging `kill $(pgrep -f ...)` -- the destructive-git hook is precedent for blocking an invocation shape rather than per-call care; a call for whoever owns the hook set.

Related: #16412, the backgrounding recipe that made the processes both were cleaning up.
