---
id: e0389497-87f0-53b2-a550-a6a375788957
slug: wrapper-exit-capture-headless-only
page-type-slug: finding
title: "Wrapper exit capture headless only"
domain-slug: domain/global
---

# Claim

The wrapper-exit forensics subsystem has exactly one call site and it is the headless spawn path, so its coverage runs opposite to need. A headless seat's death already produces a `systemd-run` scope accounting line, and it additionally gets the full `wrapperExit` capture; an interactive `pty-proxy` seat produces no scope line and gets no capture either. The class that already holds one record gets two, and the class holding none gets none — and the interactive class is the one Alan sits in front of.

# Evidence

Read against `~/code` on 2026-08-07.

`rg -n 'stampWrapperExit' --glob '!**/dist/**' -g '*.ts'`, run without a pipe so nothing truncated it, returns one production call site: `packages/agents/supervisor/src/spawn-headless.ts:64`, imported at line 29. Every other hit is the definition, `stampWrapperExitForAgent` at `packages/agents/shared/spawn-state-wrapper-exit-stamp.ts:51`, or that file's unit test.

The interactive path runs through `packages/agents/supervisor/src/pty-proxy.ts`. `rg -n 'exitCode|onExit|\.on\("exit"'` over it returns one line, `process.on("exit", restoreTerminal)` — a terminal restore, not a capture.

The scope accounting line divides on the same boundary. `buildScopeLaunchCmd` in `packages/agents/shared/scope-launch.ts` wraps a launch in `systemd-run --user --scope`, and is called from `detached-exec-launch.ts:184` and `launch-supervisor.ts:229`. `pty-proxy.ts` imports nothing from `scope-launch`.

`packages/agents/shared/agent-exit-capture.ts` is tracked and live and states three rules, the first being capture before decay: `/proc/<pid>` is gone the instant a process exits, so a death not captured at its own detection point leaves nothing recoverable later.

This is not the gap in `agent-life/headless-deaths-single-site.md`. That one concerns which deaths get an `agent.exit` row and names `spawn-state-exit-stamp.ts`; `git ls-files` confirms that and `spawn-state-wrapper-exit-stamp.ts` are two separate files. It notes an interactive seat has no spawn-state file for a crumb; the observation here is that the wrapper-exit stamp is called from one seat class only.

Found ingesting `dirty/skills/agent-harness/findings/seat-liveness-halting-and-stalls.md`, where it stood twice, one copy corrupted. That source is queued for removal.
