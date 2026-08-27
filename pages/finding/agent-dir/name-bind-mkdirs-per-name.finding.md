---
id: 2d6198db-9063-5096-a6f2-a33600db0837
page-type-slug: finding
title: "Name bind mkdirs per name"
domain-slug: domain/global
---

# Claim

Every name bind creates a name-keyed agent dir, so the directory count grows with names
rather than with agents.

# Evidence

`packages/agents/shared/db-agent-rename.ts:109` calls `mkdirSync(agentDirPath(name), { recursive: true })`
inside `setAgentName`, so a directory is created for every name a seat has ever bound, including
each spelling a rename passed through.

`~/agents` holds 8,637 name-keyed directories against 20 uuid-keyed ones, counted 2026-08-17.

`tools/lib/supervisor-startup-reap.ts:58` filters entries on a uuid shape, so none of the 8,637
is reapable by it.

`tools/commands/seat/set-name.ts:2,18` states this effect in its summary and help, and the
command itself contains no `mkdir` — the effect is the code repo's, reached through
`@agents/shared/db`.
