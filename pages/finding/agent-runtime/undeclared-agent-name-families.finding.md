---
id: 38e58d96-edc1-56d1-ba71-d9cea357fc63
slug: undeclared-agent-name-families
page-type-slug: finding
title: "Undeclared agent name families"
domain-slug: domain/agent-runtime
---

# Claim

`tools/lib/seat-name-families.ts` declares seat-name families that no page declares. Eight were found; re-measured 2026-08-27, five are gone — `instanced-seat`, `project-scoped`, `project-scoped-indexed`, `suffixed-runner`, `persona-campaign` — and three stand at lines 2 and 10-12: `person`, `bare-persona`, `composed-identity`. `bare-persona` and `composed-identity` match nowhere under `pages/domain/`.

# Evidence

Measured 2026-08-12 in `packages/agents/shared/agent-name-grammar.ts` and `agent-name-families.ts`. Re-measured 2026-08-27 in `tools/lib/seat-name-families.ts` and `tools/lib/admit-seat-name.ts`, which is where that grammar now stands; the two old paths are gone.

`parseAgentName` runs the eight arms in a fixed order, and the header records that the order is load-bearing: the person arm must run first or `ki-handler` is claimed by an arm reading the wrong vocabulary, and `persona-campaign` must run ahead of the composed arm or `iris-code` lands in the wrong family. That is grammar, and the corpus states none of it — a reader of `pages/domain/seat-name.domain.md` learns what a seat name spells and nothing about the other things an agent name can be. The family word is still load-bearing: `admitSeatName` returns one (`tools/lib/admit-seat-name.ts:17,22`), and `tools/lib/seat-name-restate.ts:25-26` and `tools/lib/seat-name-stands.ts:18` branch on it.

`Plain Or Declared` wants a word given a sense of its own declared as a domain first. Each family word is such a word, and `bare-persona` and `composed-identity` are invisible from every page today.

This is the residual of `second-name-grammar.md`, which was deleted when its fork was ruled and cut as #18891. #18891 moves the seat-name READING out; it declares nothing about the other seven families, and deliberately.
