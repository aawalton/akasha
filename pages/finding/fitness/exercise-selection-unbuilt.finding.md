---
id: 98711f68-fdfc-5339-ae2b-64f1a213238b
slug: exercise-selection-unbuilt
page-type-slug: finding
title: "Exercise selection unbuilt"
domain-slug: domain/fitness
---

# Claim

In the fitness domain, exercise selection is entirely agent-driven with no programmatic selection algorithm. Alan directed (2026-07-24) a programmatic, testable, improvable selection framework instead; by 2026-07-24 the framework's design was complete, including settled goal-priority weights (longevity 40% / energy 30% / functionality 20% / aesthetics 10%, held as tunable data), but it remained unbuilt.

# Evidence

Source: project #15797 (someday_maybe, live-on deploy, domain fitness), captured notes only, no objective, moved off the retired `notes` attribute 2026-08-15. Owner: Aelwyn. Raised by Alan 2026-07-24.

Vision: today selection is emergent, single-set coaching, movements hand-picked — no algorithm. Alan's call: wrong solution; Aelwyn should build and operate an explicit, testable, improvable selection system (shift from agent-as-selector to agent-as-builder/operator).

Approach: research before design (exercise principles + Alan's objectives), then design, then build. Two research streams launched 2026-07-24 as background subagents.

Current-system refresh (2026-07-24): catalog is the `exercise` page-type, 873 free-exercise-db entries + custom, with muscles/equipment/force/mechanic/loadFactor+implementCount; movement-pattern not stored. Selection: none — static weekly focus schedule + `digest` (from logged history, progression target = beat best by 1 rep); constraints/equipment/injuries display-only, never filter the catalog. Tracking: workout-session + set-log; points = strengthVolume/7. Gaps: workout-template vestigial; focus attribution fragile; recency computed but unused. Small bugs: /70 vs /7 stale docs; stale points-formula string.

DESIGN COMPLETE (2026-07-24T20:56): goal-priority weights settled by Alan — Longevity 40% / Energy 30% / Functionality 20% / Aesthetics 10% (chosen over the 35/27/23/15 research proposal as rounder/more memorable and a truer representation). Weights live as data (selection-policy singleton), tunable without a rebuild. Full design draft: ~/agents/aelwyn/design-exercise-framework-draft-2026-07-24.md. Planned MVP order: selection-features tagging → selection-policy singleton → weighted scorer + convergence test → pattern-covering selector + double-progression → inspectability envelope (`bun ops exercise select`) → readiness gate. Last state: "moving to implementation," nothing built yet.
