---
id: 84b14a0b-31d8-5165-81db-5eac7ff343b4
page-type-slug: finding
title: "Dangling restart principle"
domain-slug: repo/code-repo
---

# Claim

Three deploy-step modules each justify restarting a daemon by naming a "Never-Restart-Running-Agents-Automatically principle" and arguing it does not apply, and no live instruction carries that principle — so the exemption each of them claims is measured against nothing a reader of the instructions tree can reach.

# Evidence

Measured at code head `d01942409a`. Twenty-one files, two spellings, no definition.

`Never-Restart-Running-Agents-Automatically` stands in three deploy steps under `packages/alanwalton/projects/cli/src/lib/`, each claiming exemption: `move-to-wake-watcher.ts:28`, "This is a daemon reload, not an agent-seat restart — the Never-Restart-Running-Agents-Automatically principle does not apply", and `move-to-memory-reaper.ts:28` and `move-to-filler-drain.ts:34` adding "governs seats, not daemons". Two of the three assert its scope, which is the clause the exemption rests on, asserted by the modules claiming it.

`never-auto-restart` stands in eighteen more under `packages/agents/`, and those are the load-bearing half — not claiming exemption but obeying it, citing it as the reason a crashed seat is alerted rather than relaunched. `supervisor-child-spawn.ts:10` heads a section "## Adoption failure (never-auto-restart, #15115, Global Principles → Safety)". `spawn-state-kill-stamp.ts:18` says "never-auto-restart is absolute here". `agent-kill-alert.ts:99` calls two crash modes ones "the never-auto-restart principle" governs. `wake-watcher-tick.ts` logs "NOT reviving (never-auto-restart)" on the path where a dead seat stays dead.

Nothing defines it. "Global Principles → Safety" names no document in either repo. The live `domains/` tree returns one hit for `restart`, about a persona's speech. What carries it sits under `dirty/` — `questions/code-repo-agents.md`, three `dirty/code/` head documents, a skills findings file — and that tree is queued for removal, so the citations outlive their only home.

A named principle carries the weight of something ratified. A later author cannot tell whether it was retired, renamed, never landed or is being paraphrased — the citation reads the same in all four cases, and here it decides whether a crashed agent comes back.
