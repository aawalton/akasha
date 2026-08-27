---
id: e7072471-8f0a-5e1f-92a8-993a3dc331a6
page-type-slug: finding
title: "Step name stepname duplicate property"
domain-slug: page-type/pipeline
---

# Claim

The `step` page-type declares two live property-definitions for one abstraction, `name` and `stepName`, identical on 100% of 49,513 rows over 2 days, but the raw-row surface exposes only `name` and the `ops pipeline steps --json` verb projects only `stepName`, so an agent reading either surface gets a correct-looking answer that is wrong the instant it moves to the other, with no signal that it moved.

# Evidence

Project #16338 (domain: pipeline, status: someday_maybe, live-on: deploy). No objective; moved off retired `notes`, 2026-08-15.

Surfaced by #16259 re-scoping a disputed finding, verified by athena. The `step` page-type declares two live property-definitions for one abstraction — `name` (id 019ebc95-3de3-7be6-9100-9e5e1e831be8) and `stepName` (id 019db533-f3a3-7252-a779-e351f2799c86) — identical on 100% of 49,513 step rows over 2 days (carrying `name`: 49,513; carrying `stepName`: 49,513; `name` IS NOT DISTINCT FROM `stepName`: 49,513).

Surfaces disagree: raw rows (`public.pages` via psql) expose both; `ops pipeline steps --json` projects workflowName, stepName, status, exitCode, podName, startedAt, completedAt — `name` is ABSENT. Reading a raw row, `name` is right; reading the verb, `stepName` is right; each wrong the moment it moves to the other surface, no signal it moved. Produced a live dispute: one agent reported "`s.name` does not exist" (true of the verb's projection), another measured `name` does exist (true of the raw row) — both right, neither statement carried its subject.

Why it earns a fix: Global Principles → Ubiquitous Naming and Parsimony (49,513 rows carry a duplicated string nobody needs twice — storage, index surface, per-agent comprehension cost).

Recommended: retire one, migrate readers — not document both, which preserves the ambiguity. `stepName` is the better survivor (what the verb projects, more specific, `name` collides generically) but that's the CI domain owner's call. Sequencing follows add-before-remove in reverse: migrate every reader of the retiring key, verify zero remain with a value-predicted control, then retire the property-definition and drop the attribute.

Not established: whether any code writes the two independently — 100% agreement today is consistent with one write path populating both but doesn't prove it; trace the write path before assuming a single source.
