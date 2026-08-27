---
id: 371305cd-d078-5252-978b-5d8a97c604f7
slug: persona-routes-to-removed-documents
page-type-slug: finding
title: "Persona routes to removed documents"
domain-slug: domain/global
---

# Claim

The live Iris persona routes her turn math and her state-sweep categories to two documents that no longer exist, and the state sweep she needs is in neither of them.

# Evidence

Measured 2026-08-08 while emptying `dirty/code/packages-alanwalton-tower-docs-mechanics.md`.

The Iris persona page row `019ef9f8-8237-7a6a-b3d6-7821cc814b7c`, read with `ops page show --properties conduct` so the value came back whole rather than as a placeholder, closes its turn paragraph: "The full math and the state-sweep categories live in `mechanics.md` and `sheet-schema.md`; I follow them, I do not re-derive them here." The same sentence stands in tracked source at `packages/alanwalton/personas/core/src/persona-specs/iris.persona.ts:49`.

Neither target is reachable. `git ls-files 'packages/alanwalton/tower/**/*.md'` returns zero — the tower package holds 53 tracked files and no markdown. Both were quarantined into `dirty/code/`; `mechanics.md` was emptied and removed tonight, and `sheet-schema.md` stands there queued for the same.

The pointer was already half-wrong before that. `mechanics.md`'s own opening blockquote said the per-turn steps, the intent rubric and the roll/engine/damage-gate model had moved to the-tower game page's loop-dark `gmContext` and `gmReference`. `ops awen gm-load --game the-tower` exits 0 and returns the Rulebook and a v33 doctrine pack, so the math has been page data since `~/agents/iris/notes.md:13` recorded the move (#14310, 2026-07-03).

The state-sweep categories are in neither named document. They are live at `~/agents/iris/SKILL.md` as step 5 of the play-loop checklist — Equipment on the ESO 12-slot schema, Titles, Status/body, Position/unlocks — with step 6 writing them into `sheets/alan.json`.

Not settled here: whether to repoint the row or retire the surface. `pages/finding/the-tower/action-routes-to-a-retired-seat.finding.md` records Iris's agent row as retired and the awen engine as down for rebuild; that finding is about the ACTION ROUTING target and does not touch these document pointers. Both come due at the same moment.
