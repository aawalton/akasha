---
id: 9dcf8b33-da4a-5585-b926-44a964447e3b
page-type-slug: finding
title: "Restart prohibitions unwritten"
domain-slug: domain/agent-harness
---

# Claim

Two prohibitions the fleet code calls exceptionless Global Principles — never restart a running agent automatically, and never auto-relaunch a failed one — bind the whole agent lifecycle and stand in no document a reader of the corpus can reach.

# Evidence

Nineteen files under `packages/agents/` cite `never-auto-restart` as settled law and shape their behaviour on it. `packages/agents/supervisor/src/wake-watcher-tick.ts:398-402` is the clearest: a `running` row whose process a liveness probe proved dead is an unexpected crash, and the comment says that per never-auto-restart the tick does not respawn it because reflexively reviving a crashed seat hides the failure signal that should be root-caused. It records the death, and the still-pending inbound stays queued. `supervisor-child-reconcile.ts`, `reap.ts`, `agent-kill-alert.ts`, `memory-reaper-tick.ts` and fourteen others turn on the same statement.

Nothing under `domains/` states either prohibition. The only text carrying them is `dirty/maybe-keep/code/packages-agents-claude.md:12`, which names both, calls them Global Principles under Safety, and says both are exceptionless with no seat auto-revived, the harness lead included. That file is one of 1194 under `dirty/`, a staging area no schema governs and no reader of the domain tree arrives at.

`domains/folders/instructions-repo.md` Governed From Here says an instruction belongs in this repo whatever it governs, because an instruction written beside the code sits where no schema governs it and no reader of this tree can reach it. That is the shape here, at the size of the whole fleet lifecycle.

What it costs is visible on a document I own. `domains/seat-status.md` intends that every stopped seat holding an unfinished assignment has something that will start it again. Read against the unwritten prohibition, that intent is either unreachable for the crash case or means something other than restarting the seat — and which of the two it is decides what the third objective of the `athena-consistent-seats` initiative is asking anybody to build. The intent line and the prohibition were written by different hands into different places, neither able to see the other.
