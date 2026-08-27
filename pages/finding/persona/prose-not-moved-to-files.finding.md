---
id: 3d55c8d3-1a0a-5c5f-8c29-0d2e379e1c92
page-type-slug: finding
title: "Prose not moved to files"
domain-slug: page-type/persona
---

# Claim

In persona, about 590,000 characters of authored prose sit across ten properties on the 41 live persona rows — against persona files of roughly 1,000 characters each — though `page-types/persona.md`'s Intent already requires that prose move to a child file per persona; project #19252, which would carry out that move, has nothing built yet, and the gap already shows as twelve recorded findings of a row and a file describing the same persona differently.

# Evidence

Project #19252, persona, status awaiting_worker_seat. Objectives: (1) no persona row property holds authored prose across the 41 rows `ops page list --type persona` returns; (2) every body kept from a row stands in a file the persona owns at `domains/<folder>/<her>-<item>.md`, passing `ops instructions run-gates`, a dropped body named with its reason; (3) `ops persona roster` separates a complete persona from a mid-build one without reading prose, and `rg -n FOUNDING_FIELDS` outside `dist` shows no prose property read.

Ground: `page-types/persona.md`'s Intent — "Everything else authored about a persona stands in a child file named `<her>-<item>`, rather than in her row" — never carried out.

Measured 2026-08-15, 41 live rows: portrait 41/236,731 chars; conduct 38/143,834; know 39/35,681; do 39/35,568; keepContract 40/33,489; feel 39/30,513; perceive 39/28,338; want 39/25,866; purpose 41/17,327; glance 40/3,253 — about 590,000 chars total, against persona files of roughly 1,000 chars each. Claude's row: ~11,000 chars; file: seventeen lines.

The prose reached the rows from `packages/alanwalton/personas/core/src/persona-specs/*.persona.ts`, deleted after its content moved onto the rows.

Cost: twelve findings each record a row and file describing the same woman differently — e.g. Iris's row gives neon-blue panels against turquoise in her file. `page-types/persona.md` states the ranking; only execution is missing.

Blocker: `portrait` is required on the persona page type, one of three founding fields `roster-core.ts` uses to mark a persona complete; emptying rows without moving that signal breaks the roster's read of every persona at once. `persona-attributes.ts`: no `resolvePersona` caller reads `portrait` off the resolved object any more — it renders from a document instead — so moving it is safe once the count moves too.

Assumed, not settled: whether a row keeps an empty `portrait` as a marker or the property goes entirely is left to the seat; Alan was asked and moved past it.

Standing: nothing built.
