---
id: 5eab19ce-ffcf-56a3-bfd3-b8b00ac02251
page-type-slug: finding
title: "Code cites agent message canon which resolves to nothing"
domain-slug: repo/code-repo
---

# Claim

Five code sites cite an instructions document by the title "Agent Message Canon", which no live document under `domains/` carries; two of the five print to an agent as `--help` output, so the dangling citation is read by whoever runs the verb.

# Evidence

Measured 2026-08-07 from `~/code` and `~/instructions` by the archivist seat ingesting `dirty/knowledge/agent-message.md`, which was emptied and removed in the same run.

`grep -rn "Agent Message Canon" --include=*.ts --include=*.md --include=*.sql packages/`, excluding `dist/`, returns five hits:

- `packages/agents/cli/src/agent/record.ts:36` — "See Agent Message Canon for the gate this verb serves."
- `packages/agents/cli/src/ask-alan/ask-alan.ts:29` — "the bar is Agent Message Canon's: someone must be blocked on the answer."
- `packages/agents/shared/wake-source-tags.ts:80` — "a second revive for one event is earned by nobody (Agent Message Canon)."
- `packages/agents/shared/blocked-on-record.ts:78` — "a wake nobody is blocked on (Agent Message Canon), so this verb does not send one".
- `packages/temper/scripts/src/watcher/import-errors.ts:40` — "(see Agent Message Canon)."

The first two sit inside `CommandHelp` description strings — `record.ts:7` and `ask-alan.ts:7` each declare `export const help: CommandHelp` and the cited lines fall within `description:` — so `ops seat record --help` and `ops ask-alan --help` print them to the agent running the verb. The other three are module comments.

Nothing under `domains/` carries that title: `grep -rn "Agent Message Canon" domains/` returns nothing. The nearest document was `dirty/knowledge/agent-message.md`, which stood under quarantine rather than live, and which this run removed.

The citation is by title rather than by path, so nothing resolves it: `links-resolve` gates markdown links inside the instructions repo and sees no code, and the code repo has no instrument measuring a prose citation into the instructions tree.

Not measured: whether the five were written against the quarantined document or an earlier live one, the git history of the citing lines being unread; and nothing about what the remedy should be.
