---
id: c0334a3d-9a97-5cd0-a438-23dbc15b5f48
page-type-slug: finding
title: "Status bar circles computed twice"
domain-slug: domain/alan-harness
---

# Claim

In alan-harness, the activity and hygiene circles are computed twice — once by three SQL functions #18917 landed and verified but switched no consumer for, and once by the TypeScript fold in `packages/shared/status-bar-access/src/upkeep-stoplights.ts` — and project #19039, which would fold the TypeScript copy away and cover the three functions with tests, sits unbuilt behind #18909 (itself behind #19033).

# Evidence

Project #19039, alan-harness, status awaiting_lead_definition, depends-on #18909. Objectives: (1) activity and hygiene circles computed in one place, status bar reading each from the deployed function, so nothing else drifts; (2) the three functions #18917 landed (`get_activity_stoplight`, `_wake_day_window`, `_stoplight_unanswerable`) covered by tests in the PGlite harness; (3) Alan's status bar reads what it read before — capture figures pre-switch, compare after, report a moved figure rather than absorb it.

Why: #18917 landed and verified three SQL functions but switched no consumer (no criterion asked for it). #18908 landed `get_hygiene_stoplight`, calling the switch "#18917's switch to make". Two circles are computed twice: in the database and in `packages/shared/status-bar-access/src/upkeep-stoplights.ts`. The TypeScript fold let #18917's verdict be checked three ways — worth having then, not now.

One row not three: the PGlite harness installs the committed snapshot, which lacked these functions until #18917's deploy regen, so tests couldn't predate the deploy; the switch is what earns them; splitting lands a switch with nothing holding it, or tests for a path nobody calls.

Ordered behind #18909 — not for sharing a file, but because #18909 is rewriting `upkeep-stoplights.ts` to remove its own fold, and this row removes two more from the same file; landing first would invalidate that work. #18909 is itself parked behind #19033, the supervisor acceptance test blocking branch CI for any change carrying the generated database types.

Established: `hygieneCircle`/`INBOX_TIER_WEIGHT` in `upkeep-stoplights.ts` duplicate the deployed `get_hygiene_stoplight`. #18917's capture script is at `/var/tmp/18917-capture.ts`, its reading at `/var/tmp/18917-readings-before.json`, capturing the ACTIVITY circle across fourteen days — a model for criterion 3, scratch not a deliverable. Criterion 3 matters most and is easiest to skip: a switch returning the same numbers looks identical to one that doesn't.
