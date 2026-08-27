---
id: 33506ab1-dfd9-5d9e-b33b-8322d0fb9c3c
page-type-slug: finding
title: "Deletion sized by name"
domain-slug: domain/code-quality
---

# Claim

A deletion sized by matching names is wrong in both directions, and which direction it is wrong in cannot be read off the names.

# Evidence

Two removals on 2026-08-14, both sized by one careful agent by matching a name, wrong each time and in opposite directions.

UNDER-COUNTED. On #19011 the dead-export set was taken as forty-five. Removing them left further modules unreached, and the true set was found one round at a time, each round only visible after the previous deletion landed.

OVER-COUNTED. On #19102 sixteen files in the code repository carried `halt-census` in the name, against eighteen under `tools/lib/` in the instructions repository. The difference between the two counts was stated as a containment, and the whole code-side cluster as residue. Eight of the sixteen are live: `interactive-census-core.ts` imports `TranscriptRecord` and `WAKE_FRESHNESS_MS` from `halt-census-core` and `hookRecordAt` from `halt-census-join`, by real import statements, and is itself reached by `interactive-verdict.ts`. Both readers are still code-side and belong to the interactive census and the Stop-hook verdict path rather than to the ported verb. Deleting the sixteen the name matched would have taken eight working modules.

WHAT SEPARATED THE RUN THAT HELD. Not care — the same agent was careful in both, and named her own method unprompted. #19102's project document required the removal set to be derived by re-running `check-ast-unused` to zero rather than by deleting the sixteen the name matched, and required a zero reached while a named file still stood to be reported as a reach the graph cannot see rather than accepted as a file earning its place. The seat derived, and the derivation is what surfaced the eight.

WHY THE NAME CANNOT ADJUDICATE. A shared module and a residual one are spelled alike, being named for the feature they were written for rather than for who reaches them now. Counting names on both sides of a port is a string match and reads as a containment proof.
