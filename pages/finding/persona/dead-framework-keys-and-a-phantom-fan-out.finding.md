---
id: cc927c81-a74d-56da-8b5c-72ff5e8ee0c8
slug: dead-framework-keys-and-a-phantom-fan-out
page-type-slug: finding
title: "Dead framework keys and a phantom fan out"
domain-slug: page-type/persona
---

# Claim

Two persona framework keys are parsed and read by nothing, and a comment beside one of them describes a fan-out that does not happen, so the file states behaviour the code does not have.

# Evidence

On `origin/main`, `packages/alanwalton/personas/cli/src/persona/framework-resolve.ts` declares `readsOnLoad` and `leadDoctrine` on `PersonaFrameworkAttributesSchema`. A grep over `packages` excluding `dist` finds `leadDoctrine` at that one line and nowhere else, and the only other `readsOnLoad` occurrences are a separate field of the same name on the awen seed script's own type and one citation test. Within the persona framework, both keys are parsed and never read.

`packages/agents/shared/wake-source-tags.ts` documents `AGENT_KILL_ALERT_SOURCE` as reaching the harness lead "and the rung-2 fan-out to every `leadDoctrine` persona when the keeper revive itself fails". The same file declares `FAN_OUT_SOURCES` as empty, and `leadDoctrine` is read by nothing, so no such fan-out can occur.

Project #19260 was opened against this and its branch `project-19260` carries the repair at `0490113710`, one commit over six files, unlanded and not an ancestor of `origin/main`. It drops both keys and their schema comments, cuts the fan-out clause from the wake-source comment, and owner-scopes three persona reads.

A fourth unscoped read of the same shape stands separately as `pages/finding/persona/a-tenth-unscoped-persona-read.finding.md`, and that one is not on the branch.
