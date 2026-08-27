---
id: c44b14f6-f8b3-57af-ac25-d4b159625951
slug: blocked-on-outlives-the-project-row
page-type-slug: finding
title: "Blocked on outlives the project row"
domain-slug: domain/agent-harness
---

# Claim

`blockedOn` is a project-row attribute that only the agent harness reads, and the projects cutover to files will leave its two readers pointed at a field nothing writes.

# Evidence

Alan ruled that `blockedOn` does not port to the project file: `depends-on-seqs` already carries what a project waits on, and `projectUnblockedIn` in `tools/lib/project-status.ts:88-92` already reads it off the FILE to decide whether the seat sweeper may pick the project up.

Two surfaces still turn on the row attribute:

- `tools/commands/seat/block-on.ts`, 149 lines, is its only writer.
- `tools/commands/seat/held-wake.ts` reads it at `:146`, `:163`, `:168-169` and `:210`. It is the stated carrier for an interruption — a seat that keeps its stage, so no status can say it is waiting.

The removal is not confined to this repo. `HeldWakeRow.blocked` at `held-wake.ts:99-102` is handed to `decideHeldWake` and `isParkedRow`, both injected capabilities resolved in the code repository, so dropping the field changes a contract that needs a deploy.

The attribute is barely used. Ten records exist across the whole history of the table. Six name a person or persona (`amy` twice, `athena`, `awen`, `dalla-lead`, `alan`) rather than a project, so `depends-on-seqs` could never have carried them — those are asks, not dependencies. Four name a seat whose own name encodes a project seq (`19287`, `19089`, `16900` twice), which `depends-on-seqs` does carry.

Of the seven rows holding a record now, five sit on projects already at `done`: nothing clears the record when the work closes.
