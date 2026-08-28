---
id: 8e5cee72-d39e-5b23-aa0f-99c6f24618cf
slug: companion-export-race-orphans-data
page-type-slug: finding
title: "Companion export race orphans data"
domain-slug: domain/temper
---

# Claim

The companion-export dispatch path runs an importer and exporter inside one `Promise.all`, and the exporter unconditionally rewrites `TemperCompanionsConfig.lua` from a possibly-partial map; because the addon reads a missing companion defId as an intentional clear rather than as absent data, a torn read persists across game sessions with no self-healing pass, and the companion hash is never persisted anywhere so change detection for companions does not exist.

# Evidence

From project #16194 (domain: temper). Found by #15938's implementer while scoping the Plan-tab work, and deliberately not taken on by them — scoped out so it lands before companion build rows exist, not after.

THE RACE, mechanism established: `dispatch.ts:289-297` runs the importer and exporter inside one `Promise.all`. The exporter rewrites `TemperCompanionsConfig.lua` unconditionally, including a partial map. The addon reads a missing defId as an intentional clear, not as absent data. Companions are absent from `realtimeTargets`, so a torn read survives until the player next saves in game. A partial export is indistinguishable, at the addon, from a deliberate clear, and nothing re-converges it — no self-healing pass. The two-states-one-symbol class at a write boundary, with the wrong state persisting across sessions.

SECOND DEFECT, same area: the companion hash is persisted nowhere. `import-companions.ts:258-260` is a pure `console.log` loop with no DB call, so change detection for companions does not exist.

WHY ORDERING MATTERS, and why this is not merely a robustness row: today the race is largely harmless because no companion build rows exist to be destroyed. #15938 (option B: attach as live and copy as target) creates those rows. The moment build rows exist, this race destroys real authored user data — a latent race becomes a data-loss defect at the exact moment the feature it guards starts working.

FIX PATTERN ALREADY RATIFIED IN-REPO: `watcher CLAUDE.md`, "Fix the race, keep the detector," authored for the structurally identical inventory race. Reuse it rather than inventing a second shape.

NOT IN SCOPE HERE, and Alan's to decide: linking companions turns on the shopping list for all 8 and in-game skill-bar auto-apply on summon, for target builds nobody authored. That must be settled before companion linking ships.

The row's capture was cut at a paragraph boundary and it never got a formal objective.
