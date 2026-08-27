---
id: 681b45fd-129a-56e1-b3c6-2cbbc84d9663
slug: slice-6-already-deployed
page-type-slug: finding
title: "Slice 6 already deployed"
domain-slug: domain/fitness
---

# Claim

Project #16047 (domain `fitness`, exercise-selection increment 6), filed `someday_maybe` (reset from `verification_automated` by a 2026-07-25 fleet-wide halt), in fact has landed, deployed code (commit `472b91a973f9`, deployed 2026-07-25) implementing both stated objectives — a recency scoring term and a one-set-at-a-time recommender — plus a further increment (skip-driven retirement, 5 commits, tip `e4cdcf8b99`) built and verified live but never landed, blocked on CI node-04 capacity.

# Evidence

Project #16047 (domain `fitness`, parent #15797 exercise-selection framework), owner aelwyn, created 2026-07-25T10:21:01Z, `someday_maybe` — reset from `verification_automated` by Alan's 2026-07-25 fleet-wide halt/restart; the status column no longer carries the pre-halt value, only this note does.

**Objective, Alan-directed.** (1) A recency term: a movement not performed lately scores higher, distinct from never-performed (stays novelty-budget-limited); ramping/saturating (weight 0.05, saturates 21 days), mild, stored on the selection-policy singleton, not applied to anchor derivation, expected to largely supersede the ESO `daySeed` rotation. (2) A one-set-at-a-time recommender replacing the up-front plan — Alan explicitly declined seeing the projected shape.

**Landed and deployed on main:** recency, `next-set`, an already-performed guard that holds a served slot's movement, date-guarded session auto-close, `ballisticPreference:avoid` on flex mobility slots. Deploy commit `472b91a973f9bda6a62f98c878e9c1c00b06f074`, deployed 2026-07-25 (Unix ms 1784984187071, merge-queue); 8 commit hashes recorded on the row via `--properties=commitHashes`.

**Built, verified live, NOT landed:** skip-driven retirement (persists per-session on `workout-session.retiredExercises`) and `--unretire`; tip `e4cdcf8b99`, 5 commits on branch `project-16047`. Blocked on pipeline 25891, `capacity-starved:node-04` — CI infrastructure, not this change.

Row rested at `verification_automated`, aelwyn as finisher, when the halt reset status. A later reader should check the row's current state before treating this as outstanding work — most of the objective may already be live.
