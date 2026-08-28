---
page-type-slug: finding
title: "A seat turn read is pinned to bun by the writer it reaches"
domain-slug: domain/agent-harness
---

# Claim

Reading a seat's turn state loads the module that writes seat pages, and that module cannot load outside bun — so the one process that most wants the read in-process is the one that cannot have it. Neither half is visible at the call: `agentStands(agent)` names no writer and no runtime, and the chain to both is four imports long through files that each import only their neighbour.

# Evidence

Found on 2026-08-28 while bringing the editor's last subprocess reader in-process.

The editor's tab strip asks `ops`'s `agent-turn-colors` verb for the colour each seat's terminal is drawn in — a subprocess per turn change anywhere in the fleet. Every other reader in the extension had come in-process by then, so this one was tried the same way: import `colorsOf` and call it.

It does not load. `import("./tools/agent-turn-colors.ts")` under node throws `TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined` at `tools/lib/gated-write.ts:7`, which reads `const TOOLS_ROOT = dirname(dirname(import.meta.dir))`. `import.meta.dir` is bun's; node spells it `import.meta.dirname` and leaves bun's undefined, so the module throws at load rather than at use. Every module that imports it is unloadable under node, and the extension host is node — the same node whose type stripping requires an explicit `.ts` on a relative import, which is a separate fault of the same kind: a shared library that only ever ran under bun.

The chain is `agent-turn-colors.ts` → `lib/agent-turn-state.ts` → `lib/subagent-turn.ts` → `lib/subagent-page.ts` → `lib/gated-write.ts`. Nothing in it is about writing except the last two. `agentStands(agent)` asks whether a subagent stands; `subagent-page.ts` answers that and also holds `writeSubagentPage` and `removeSubagentPage`, which shell out to `ops write` and `ops rm`, and takes `writerFor(WRITER)` at module scope. So a colour read reaches the write path, and the write path is what pins the runtime.

`tools/lib/subagent-page.ts:3` also spelled its import of `page/name/name` without the extension, so the chain failed to resolve under node before it failed to load; fixed at `8d78bfde`. That fault class had already taken the whole extension down on 2026-08-27, when `seat-forest-asked.ts` named `repo/roots/roots` without one and the activation reported only `Cannot find module`.

Two reads that do not need any of this were already in-process and fast: `tools/lib/work-tree-drawn.ts` folds seat turn states into initiative colours at 13ms for thirteen seats, and `tools/lib/seat-presence-read.ts` answers which page a seat stands on. Both reach `seat-turn-state.ts` without reaching `subagent-turn.ts`, which is the only part of the chain that pulls the writer in.

The tab strip therefore still spawns, at about 49ms and off the extension host's thread, and that is the reason rather than a preference.
