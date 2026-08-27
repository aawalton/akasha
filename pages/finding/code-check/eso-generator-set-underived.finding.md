---
id: 9d4ba399-9065-5d9b-b6f3-097d4ab74191
page-type-slug: finding
title: "Eso generator set underived"
domain-slug: domain/global
---

# Claim

A new generator that walks the `~/esoui` clone and omits the provenance line emits artifacts `check-eso-typings-fresh` cannot see, and nothing refuses it.

# Evidence

The check derives its population by walking `packages/temper` for generated-by-path files carrying `Generated from the ~/esoui clone by <path>`, which #18471 put in place of a three-entry literal. Membership therefore hangs on a line each generator writes about itself, and four generators write it today: the ESO type generator, the two name-authority generators, and the HUD scene-catalog generator. They are exactly the four callers of `esouiDir()`, `esouiSourceDir()` and `esouiDocPath()` outside the paths package, so the set is closed as of this reading.

Nothing holds it closed. Driving `buildEsoClonePopulation` over a plant tree whose only generated file carries no provenance line returns `scanned=1 population=0`, and the run refuses — so a convention abandoned wholesale is caught. A fifth generator added beside the four is the case that is not: its artifacts stay out of the population while the other eight keep it non-empty, so the run reports green over a surface that no longer covers the tree. That is the shape `Derived Reach` names, one level up from where #18471 applied it: the artifact list is derived from the tree, and the generator list is not derived from anything.

Read on 2026-08-10 against `project-18484` at commit `3fb2f09e6f`, verifying #18471.
