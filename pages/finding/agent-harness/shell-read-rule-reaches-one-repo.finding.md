---
id: 0cd75b52-b754-5db3-be0e-964d2e52d7a1
page-type-slug: finding
title: "The rule that a shell read records nothing reaches only one of the two gated repos"
domain-slug: domain/agent-harness
---

# Claim

The peer Intent line for reads should not be written. It would assert that a read made from a shell registers, and that is not soundly reachable: every way of inferring what a shell read delivered guesses permissively. The claim is already bound, as the Rule `Recorded Reading` on `domains/repos/instructions-repo.md:46-50`. What is wrong is its reach — that domain governs instructions writes alone, while the confusion lands on memory writes. `domains/agent-harness.md` governs both.

# Evidence

Measured 2026-08-20 by running.

Two routes record a reading, both calling `recordRead` at `tools/lib/read-log.ts:77`: `tools/hooks/record-read.ts`, the only `PostToolUse` matcher `Read` entry at `settings/agents.json:133-143`, and `tools/read.ts` through `tools/lib/command.ts:140,150`. The only `PostToolUse` matcher `Bash` hook is `tools/hooks/record-ops-help.ts`, which records a synthetic help key at span `[1,1]` and never a file's lines.

`cat refusals/governing-document-unread.md` and `sed -n '1,20p' refusals/file-part-read.md` delivered both files whole. The read record held 19 entries before and 19 after, naming neither. `bun tools/edit.ts` then failed `read-before-write` on the second with "never read by this agent".

Parsing the command cannot make a shell read record soundly. The Bash tool truncates output to a 2 KB preview and spills the remainder to a file, measured on a 210 KB run. Four of the twelve documents governing a `claude`/`technology`/`worker` seat exceed 2 KB, among them `page-types/role.md` at 4,935 bytes carrying 14 rules. A parser seeing `cat page-types/role.md` records all 125 lines for a fraction delivered. `cat f > /dev/null`, `cat f | grep x`, `cat $F` and `xargs cat` each record a reading never received.

Reach, measured with `tools/governs.ts`: a memory path is governed by `domains/agent-harness.md`, `domains/foundational-layers.md`, `domains/global.md`, `domains/memory.md`, `domains/repos/memory-repo.md` and `domains/work-system.md`. `domains/repos/instructions-repo.md` is absent from that set, and `domains/repos/memory-repo.md` states no read rule at all.

The refusal text now names the mechanism at both exits, landed at `c7714b8f88`.
