---
id: 76f98196-b95f-4ad6-b00f-0e076a92889e
slug: large-change-set-cannot-land-while-main-is-busy
page-type-slug: finding
title: "A large change set cannot land while main is busy"
domain-slug: domain/page-writes-system
---

# Claim

`ops write` cannot land a large change set while main is busy — not slowly, but at all. The gate's duration scales with the size of the change set, while the patch is composed against a base captured when the call begins, so every commit landing during the gate stands in the patch as a file the writer never touched. `read-before-write` then refuses it. Past about a thousand files the gate outlasts the interval between commits on main, and refusal becomes near-certain.

# Evidence

Read 2026-08-27, while moving persona-day pages.

Gate duration and outcome, same worktree, same hour:

- 1 file, `pages/page-type/persona-day.page-type.md` — 2 seconds, landed on the first attempt.
- 35 files, 17 persona-craft-day pages with their page type and 17 removals — seconds, landed on the second attempt.
- 2,025 files, 2,022 persona-day pages with their page type and two callers — 4m36s and 5m07s, refused both times.

Both refusals over the 2,025-file set named only paths the writer never touched: `agent/subagent/*.subagent.md`, `editor-extension/src/features/agent-tree/toggles.ts`, `ops-cli/global/read/read.command.code.attachment.ts`, and findings under `pages/finding/check/` and `pages/finding/code-check/`. No persona-day page was named in either refusal, so the change set was clean each time and the refusal was over other agents' landed work.

`git log --since='30 minutes ago'` counted 189 commits on main, about six a minute. A five-minute gate spans about thirty of them.

Three `--patch-file` runs over one 35-file set produced foreign files in two and none in the third, so this is a race rather than a fixed condition.

Not measured: which check accounts for the gate's duration, and whether a refused write could recapture its base rather than refuse.
