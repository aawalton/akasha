---
id: 8b7b903b-58dd-567a-8dae-dfbfbe0de980
page-type-slug: finding
title: "Bare spelling hides rotted citations"
domain-slug: domain/global
---

# Claim

`check-instructions-citations` reads a citation only where its spelling carries a root its grammar names, so prose naming an estate document as a bare `<folder>/<name>.md` stands unread. Citations of that shape resolve in the estate today, and one names a document the estate no longer carries. Reaching the shape precisely needs the estate's folder names, which `Derived Reach` refuses as a list and which the gate cannot read from a tree it asks nothing of.

# Evidence

Measured on branch `project-18484` at `9e42bb392b`, over 14737 of 14737 tracked source and markdown files — the same population the gate reports.

The gate's extractor cannot emit a bare citation at all: `PATH_SHAPED` in the shared citation grammar requires `~/` or one of this repo's own top-level segments, so a bare candidate never reaches `classifyCitationRoot`. Measuring through the gate's own extractor therefore returns zero and says nothing.

A widened predicate over any `<segment>/<...>.md` the gate does not already reach, run over the same population with a live negative control, returned 702 candidates in 422 files: 172 resolve in the estate, 0 resolve in this repo, 530 resolve in neither tree. Refusing every candidate would be wrong 75.5% of the time. The delivering seat of #18516 measured the same class with a narrower predicate and reported 604 against 196, a 68% rate — different predicates, the same conclusion.

`packages/agents/cli/src/agent/halt-census-baseline.ts` and `packages/agents/cli/src/agent/halt-census-core.ts` both cite `domains/seat-turn-end.md`. The estate carries `domains/agent-turn-end.md` and no document of the cited name, so both citations name a document that is gone and the gate reports neither.

The check's own docblock has declared this shape out of scope since before #18516, byte-identical, on the ground that enumerating the other tree's folders rebuilds inside this repo the dependency the gate exists to remove. So the bound is deliberate and stated; what is unrecorded is that real, rotted citations stand inside it.
