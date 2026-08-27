---
id: a3fb8bdf-b2fe-569e-8275-d97c149dd897
page-type-slug: finding
title: "Two tiles have no domain"
domain-slug: domain/global
---

# Claim

Nine widgets ship in Alan's iOS extension and seven have a domain under `readouts`. `persona-stoplights` and `safety-level` have none, so the family reads as complete and is not. Nothing lists the children on `domains/readouts.md`, so no line of it can show the gap, and a reader taking the seven domains for the set of readouts is reasoning about two tiles fewer than are on his phone.

# Evidence

Measured 2026-08-10 during a `review-instructions` pass over `domains/readouts.md`.

The population is the render harness's own, not a hand count: `scripts/render-harness/run.sh --widget pipeline-health` reads the widget sources for the bundle's shipping list and turns red on any widget or family no case covers. It passed ten coverage cases — values-stoplights/small, claude-usage/small and /medium, inbox-stoplights/small, project-counts/medium, pipeline-health/medium, upkeep-stoplights/small, categorize/small, persona-stoplights/large, safety-level/small.

The seven domains declaring `domain-parents: readouts` are readout-categorization-backlog, readout-claude-usage, readout-inbox-stoplights, readout-pipeline-health, readout-project-counts, readout-upkeep-stoplights, readout-values-stoplights.

Both uncovered tiles are live. `PersonaStoplightsWidget.swift` reads `/api/persona-stoplights`, `SafetyLevelWidget.swift` reads `/api/habit-stoplights`, and both routes call `guardReadout`. `domains/persona-reward.md` already relies on the persona circles being on his home screen. `domains/safety-level.md` exists but is the reading — "how settled Alan's body is underneath the day", under `safety-bar` — rather than the tile, and `domains/readout-upkeep-stoplights.md` already treats Safety as one circle among six.

Not measured: whether safety-level is a readout in its own right or a second drawing of one circle of the upkeep readout. Nothing was drafted — which domains should stand is a definer's call and no instrument settles it.
