---
id: 43261e8d-2e7b-50bf-8b24-0359e563797b
page-type-slug: finding
title: "Skill still teaches deleted landing"
domain-slug: role/scenewright
---

# Claim

A define run dispatched against project #17352 moved it to `exploration` and then died without writing any definition output, sending no hand-back and leaving no exit record — the same failure mode its sibling #17351 hit in a separate dispatch, and neither death has been diagnosed.

# Evidence

Project #17352, domain `scenewright`.

Scope at creation: parent criterion 9 only. The `scenewright` role skill's "Land it" section prescribes the four-call hand assembly its sibling row exists to delete, so a skill still teaching it is the defect surviving that fix. Two sections name where their half of the record goes: "Land it" (replaced by the landed command) and "After" (where Alan's read attaches, a missing read staying a state rather than something chased).

Already done, not to redo: the "Name the trial before you write" section already carries the varied-versus-house-style distinction — it landed ahead of this row since it needs no mechanism, only telling the writer what to produce and name.

Why a separate row rather than the sibling's last step: sequencing is fixed (add-before-remove). `~/instructions` is live for every running agent the instant it commits, with no deploy window to catch it, so the command ships first and the skill is rewritten second; reversed, it hands every `scenewright` seat an instruction whose mechanism doesn't exist. A `deliver` worker hands back before its manager deploys, so the sibling can't hold this and still be finished at hand-back — an obligation dischargeable only after deploy is invisible if kept in a worker's memory rather than on the board.

[2026-07-30T12:53:30.559Z] HALTED by Alan, left at `exploration`, definition never run. Fleet work-halt set; status left as found. A define run was dispatched, moved this row to `exploration`, then died without writing any definition output — the scope above is only creation-time text. It sent no hand-back and no exit record. `exploration` means a run started, not scope partly settled. Both this tree's define runs — this row and sibling #17351 — failed the same unobserved way in one dispatch; the parent row carries what is known. Resume needs a fresh define run, dispatched on its own, not before the death is understood.
