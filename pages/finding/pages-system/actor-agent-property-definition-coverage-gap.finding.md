---
id: 858643da-5750-5748-aceb-fdf3f74efa25
slug: actor-agent-property-definition-coverage-gap
page-type-slug: finding
title: "Actor agent property definition coverage gap"
domain-slug: domain/pages-system
---

# Claim

`actorAgent` has no property-definition on the `project` page type, yet `ops project add-owner` writes it successfully (93 project rows over 20 days) while `ops project update --owner` rejects the identical write with `Unknown property keys`, so the deploy-gated property-definition-coverage guard is bypassed on one write path and not the other.

# Evidence

Project #16333 (domain: pages-system, status: someday_maybe, live-on: deploy). No objective; moved off retired `notes`, 2026-08-15.

`actorAgent` has no property-definition on `project` (`bun ops property-definition list --page-type project` returns nothing matching). Two write paths disagree: `ops project add-owner` (`homeProject`→`patchPage`, `project-homing.ts:76`) SUCCEEDS; `ops project update --owner` (`update.ts:112`, reads `AGENT_ID`) REJECTS: `Unknown property keys for project page type: actorAgent`. Both stamp constant `ACTOR_AGENT_ATTR` (`provenance-stamp.ts:47`); only one is stopped.

Evidence: #16329 carries the key, written by `add-owner` just before filing (`bun ops page show 019f9b50-e5f7-7ad0-9d2a-1eb80c79238f --properties=actorAgent,owner` → actorAgent 019f9a38-03a1-73f4-b252-5fb1a3b46440, owner dalla).

Blast radius: 93 project rows carry `actorAgent` (deleted_at IS NULL), 2026-07-05T19:15:18Z–2026-07-25T22:14:49Z.

User-visible: `update --owner` fails every time (AGENT_ID always set), reproduced twice; error names `actorAgent`, unmentioned by the caller. Alternative `ops project add-owner --seqs <csv> --agent <name>` has non-matching flags (`--seq`/`--owner` vs `--seqs`/`--agent`), costing two failed calls.

Per Property-Definition Coverage (`.claude/docs/property-definition-coverage.md`), every code-written key needs a property-definition, deploy-gated; 93 rows over 20 days show the gate didn't stop this.

Two candidate defects, don't fix one alone: (1) `actorAgent` should exist and doesn't — fixing makes `update --owner` work free. (2) coverage guard isn't uniform — `patchPage` admits an undeclared key `update` rejects; the gate's guarantee is narrower than claimed.

Not established: why the gate didn't fire (scan scope, diff trigger, or added after `actorAgent` shipped — 2026-07-05 is a lead not a cause); whether other undeclared keys exist elsewhere (93 is a floor for this key only; no full sweep run).
