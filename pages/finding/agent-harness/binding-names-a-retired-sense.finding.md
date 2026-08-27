---
id: b3cf16b9-c9aa-5e89-bc76-fbb2754bc4d7
slug: binding-names-a-retired-sense
page-type-slug: finding
title: "Fifteen instructions modules use `binding` in the sense a retired domain took away"
domain-slug: domain/agent-harness
---

# Claim

The word `binding` names project state in about fifteen instructions modules, and `domains/retired/binding.md` retired that sense of the word.

# Evidence

`domains/retired/binding.md` retires `binding` in the sense of "the documents a seat is held to", now written as governing documents. A second sense — a project row's status and its holders — was never declared and is what these modules carry: `ProjectBinding` and `isTerminalStatus` in `tools/lib/project-binding.ts`, `getProjectBindingBySeq` in `tools/lib/supervisor-child-reconcile-db.ts`, `holderBindingBySeq` and `HolderBinding` in `tools/lib/project-holder.ts`, `isBindingClaimantProvenDead` in `tools/commands/seat/owed.ts`, and `bindingStatus` in `tools/lib/decide-compact-resume.ts`, `tools/lib/supervisor-decide-payload.ts`, `tools/lib/supervisor-resume-asks.ts` and `tools/lib/supervisor-iteration-outcome-handlers.ts`.

The state these name is now read from a project's document rather than from a row, so the word points at a store that is going. `tools/lib/io-wedge.ts` and `tools/lib/wedge-roster.ts` were renamed to `projectStatus` when the words-read gate refused them; nothing refused the rest, because the gate judges the file being changed.

A third sense stands unaffected and is not part of this: `SeatBinding` in `tools/lib/memory-reaper-owner.ts` and `tools/lib/memory-reaper-tick.ts` resolves a pid to the seat that owns it, and `Bindings` in `tools/audits/property-types-bind.ts` is about property types.

Measured by grepping `tools/` for `binding`/`Binding` on 2026-08-19. Not measured: whether any of these names reaches a page key, a database column or an ops flag, where renaming would cost more than the file.
