---
id: 38e58d96-edc1-56d1-ba71-d9cea357fc63
page-type-slug: finding
title: "Undeclared agent name families"
domain-slug: domain/agent-runtime
---

# Claim

`packages/agents/shared/agent-name-families.ts` declares eight agent-name families that no instructions document declares — `person`, `bare-persona`, `instanced-seat`, `project-scoped`, `project-scoped-indexed`, `suffixed-runner`, `persona-campaign`, `composed-identity` — while 29 `seat-*` documents stand and only the last of the eight is a seat name.

# Evidence

Measured 2026-08-12 in `packages/agents/shared/agent-name-grammar.ts` and `agent-name-families.ts`.

`parseAgentName` runs the eight arms in a fixed order, and the header records that the order is load-bearing: the person arm must run first or `ki-handler` is claimed by an arm reading the wrong vocabulary, and `persona-campaign` must run ahead of the composed arm or `iris-code` lands in the wrong family. That is grammar, and the corpus states none of it — a reader of `domains/seat-name.md` learns what a seat name spells and nothing about the seven other things an agent name can be.

`Plain Or Declared` wants a word given a sense of its own declared as a domain first. Each of the seven non-seat families is such a word, and each is invisible from the instructions repository today.

This is the residual of `second-name-grammar.md`, which was deleted when its fork was ruled and cut as #18891. #18891 moves the seat-name READING out; it declares nothing about the other seven families, and deliberately.
