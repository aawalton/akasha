---
id: fb8743c7-023d-50d5-86f6-e08776bdfa63
slug: four-turn-keys-are-declared-by-nothing
page-type-slug: finding
title: "Four seat turn keys are declared by no property document, so the most informative column cannot be shown"
domain-slug: page-type/seat
---

# Claim

Four keys are written to seat fast files and declared by no property document: `turn-state`,
`turn`, `turn-start` and `turn-start-source`. No view may name an undeclared key, so the most
informative column a seat has cannot be shown. Three cannot take the slug the page type
requires, because three domains already hold those exact slugs.

# Evidence

`page-types/seat.md` itself names `turn` as a seat property. `turn-state` holds the stored
value `{"value":"working","at":...}`, so it is `type: json` rather than a scalar, and a
property document for it landed as `properties/seat-turn-state.md`.

The other three are blocked on `[domain-slug-unique]`. `page-types/page-property-definition.md`
says a property definition's domain is named for the type and key, which would want
`seat-turn`, `seat-turn-start` and `seat-turn-start-source` -- and `domains/seat-turn.md`,
`domains/seat-turn-start.md` and `domains/seat-turn-start-source.md` already stand at those
slugs. Resolving it means either off-pattern property slugs or converting those three domains
into property definitions, and both change lines under `Every Changed Line`.

These keys came to be undeclared because fast files bypass the write gate.

Two more facts about seats want a home, both found while repointing worktree reconcile off the
agent row:

A Design line this page type could hold -- "A seat roster that could not be read and one
holding no seat are one answer, and neither says that nothing is held." The old reader returned
an empty array on an unreadable roster and its `catch` fired only on a throw, so every worktree
read as unheld, pointed straight at worktree deletion.

And `properties/seat-model.md` declares a property nothing writes: measured absent on every
standing seat.
