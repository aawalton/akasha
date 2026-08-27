---
id: 37e1547e-5411-5595-bbc8-7cef9727ac36
page-type-slug: finding
title: "Alan relay target unresolvable"
domain-slug: domain/seat-principal
---

# Claim

The remedy `ops seat send` hands a headless agent refused from Alan's inbox names a recipient that does not resolve.

# Evidence

`packages/agents/shared/alan-identity.ts` refuses a send to the `alan` agent from any headless, non-voiced agent and tells it to route the question to `aine`, "the single entry point", spelling the command out. No agent row holds the bare name `aine`: the persona has `aine-lead` and a developer seat, and name resolution matches a whole name rather than a prefix. Run from a live seat on 2026-08-10, `bun ops seat send --to aine --content probe` exits 2 with `No agent currently holds the name 'aine' (searched current names only)`.

So the refusal is well formed and its remedy is not reachable. Both halves fail loud rather than silently, which is why this is an observation about a dead end rather than about a misroute — the agent is stopped twice and told nothing that works.

Seen while landing #18384, which changed the spelling in that same sentence from a positional to `--to` and did not touch which name it points at.
