---
id: 6ccbc1b5-7759-5fd2-86af-9d2aaf68d373
slug: landing-define-run-died-silently
page-type-slug: finding
title: "Landing define run died silently"
domain-slug: role/scenewright
---

# Claim

A define run dispatched against project #17351 moved it to `exploration` and then died without writing any definition output, sending no hand-back and leaving no exit record — the same failure mode its sibling #17352 hit in a separate dispatch, and neither death has been diagnosed.

# Evidence

Project #17351, domain `scenewright`.

Scope at creation: parent criteria 1–8, everything live before the role skill uses it — property definitions on `story-chapter` (data, not a migration); the landing command (subject, ask, prose, trial record; idempotent); the read-attach command (Alan's read, in a field distinct from any craft-read field); the exit-rule query (chapters landed with variables declared and no read attached); a test asserting that query renders both verdicts; and the `Athena` chapter (`019fb2d8-b074-7c15-a88a-48b294bed06a`) brought onto the path with its `wordCount` removed.

Bounds as fixed constraints: no creating/modifying `authored-story` (story creation stays off this path — folding it in produced the `narrator`-as-prose defect); no aggregate typed by hand, since `@alanwalton/story-length` derives them; property definitions go on `story-chapter` itself, not a sub-type; nothing here prompts Alan for a missing read — its absence is a state to query, never chase; the backfill writes only what Alan already stated; this child does not touch the `scenewright` skill, its sibling with a fixed order against this row.

Every parent criterion names its verifying instrument; criterion 6 decides whether this succeeded or rebuilt a broken instrument.

[2026-07-30T12:53:29.762Z] HALTED by Alan, left at `exploration`, definition never run. Fleet work-halt set; status left as found. A define run was dispatched, moved this row to `exploration`, then died without writing any definition output — the scope above is only creation-time text, no partial definition to reconcile. It sent no hand-back and no exit record. `exploration` means a run started, not that scope is partly settled. Both this tree's define runs — this row and sibling #17352 — failed the same unobserved way in one dispatch; the parent row carries what is known. Resume needs a fresh define run, dispatched on its own, not before the death is understood.
