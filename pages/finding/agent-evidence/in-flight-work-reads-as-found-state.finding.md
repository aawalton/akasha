---
id: c4b37943-8a8c-4be2-bded-9538faa3f713
page-type-slug: finding
title: "In-flight work reads as found state"
domain-slug: domain/agent-evidence
---

# Claim

Where several agents write into one tree, nothing in a reading distinguishes another agent's work in flight from work that was already there. A port half-landed reads as a second implementation that had been diverging, and a reference deleted a minute ago reads as one the instrument that reported it invented.

# Evidence

Two instances on 2026-08-24, on branch `change-19458`, with subagents dispatched up to twenty at once into one worktree.

An agent surveying `ops temper addon bundle publish` reported `tools/commands/temper/addon/bundle/build.ts` as a complete reimplementation of `packages/temper/addons/scripts/build/build-addon-bundle.ts` — sharing `ARCHIVE_NAME`, `ENTRY_MTIME`, `resolveDistributableSet` and verbatim error text — and concluded two forks of one script stood in the two repositories. `git log --diff-filter=A` puts that file's creation at `0c17897a2`, in the same session: it was the port of the script it was compared against, made hours earlier by another agent. Every tell it read as long divergence was evidence of a fresh copy.

The same agent searched all 235 lines of `publish.ts` for the string `build-addon-bundle`, found none, and concluded `ops graph rooted --ids` attributes a page's string to the command that page documents. `publish.ts` had held `const BUNDLE_SCRIPT` naming that path, and a line spawning it, until `39dabf179d` — made between the graph reading and the search. It was a live invocation, so the agent reported that the instrument had invented a reference which had in fact been what ran the script.

The second is the costlier shape: a disagreement between a fresh check and an earlier instrument reading was explained by faulting the instrument, inside a loop whose method is to trust that instrument over intuition.

A case the same day where this did not happen: an agent found five uncommitted modifications in its worktree, judged them another agent's mid-flight migration, and left them. What it had was the rule against building on state whose owner it had not established. Nothing in the files told it.

Not measured: how often a reading in that worktree was taken across another agent's write.
