---
id: efaa64c8-d796-5084-9469-01f976699004
slug: draining-a-page-type-breaks-readers-outside-it
page-type-slug: finding
title: "Draining a page type breaks readers outside it"
domain-slug: domain/narrative-engine
---

# Claim

Moving a narrative-engine page type from rows to files breaks anything outside the domain that reads a row of that type without naming one, and nothing in the migration reports it.

# Evidence

Draining `story-chapter` to zero live rows failed every deploy in the fleet. The deploy's render gate, at `packages/alanwalton/projects/cli/src/lib/move-to-deploy-render-gate.ts`, asks for one live `story-chapter` row to render as its control and refuses with `deploy_render_gate_failed` when it finds none. It names no chapter, so nothing tied it to the migration and nothing was found by searching the corpus for the slug.

The same gate reaches for a `game` row with `gameEngine: awen`, ordered by seq ascending, limit 1. `game` is 8 live rows and is itself queued to move to files, so the same failure is already loaded for that stage. A seeded fixture row, `awen-browser-test`, stands beside those 8 and the query picks a real game of Alan's ahead of it.

The readers that were migrated deliberately were found by reading code that named the page type. A reader that asks for any row of a type is invisible to that search, and it fails only once the last row goes.
