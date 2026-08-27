---
id: 21c77047-2172-53d2-84e0-0d0a196dc4ed
page-type-slug: finding
title: "Turn end doc path dead"
domain-slug: domain/agent-turn-end
---

# Claim

Six files across the code and instructions repositories cite `domains/seat-turn-end.md` as where the legal-turn-end rule is stated, and no document is at that path — the live slug is `agent-turn-end`. Five of the six are the halt census's own help text and docblocks, which is the surface a reader reaches for when a census figure surprises them.

# Evidence

`domains/agent-turn-end.md` declares `domain-slug: agent-turn-end`, and nothing in the instructions repository declares `seat-turn-end`. A search for a file of that name across the repository returns nothing.

The citations, read 2026-08-10 with the code repository at `80ea619aa1`:

- `tools/lib/halt-census-shell.ts:7` in the instructions repository
- `packages/agents/cli/src/agent/halt-census.ts:32`, inside the `--help` body the verb prints
- `packages/agents/cli/src/agent/halt-census-baseline.ts:104`, inside a comment the baseline file carries
- `packages/agents/cli/src/agent/halt-census-core.ts:42`
- `packages/agents/cli/src/agent/halt-census-shell.ts:7`
- `packages/agents/cli/src/agent/interactive-cases.unit.test.ts:12`, as `domain-parents: seat-turn-end` in a fixture

The one instructions-side citation could be repaired on the commit. The other five are code, so they reach production over a branch, CI and a deploy, and repairing only the reachable one would leave the two repositories citing different dead paths rather than one. Found while taking the post-deploy readings for #18556, which added a legal ending and so read the declaration these files point at; nothing in that project caused the divergence.
