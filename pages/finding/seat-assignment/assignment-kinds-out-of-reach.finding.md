---
id: a682848a-10fc-5c95-b169-4486661cff46
slug: assignment-kinds-out-of-reach
page-type-slug: finding
title: "Assignment kinds out of reach"
domain-slug: domain/seat-assignment
---

# Claim

The five seat-assignment kinds are enumerated in the Definition of `domains/seat-assignment.md` and stated a second time by the five documents declaring `domain-parents: seat-assignment`. Neither that document nor `domains/seat.md` declares a `glossary:`, so a seat stating this domain reads the enumeration without the kinds' definitions, while a seat holding a role reaches all five through the glossary on `domains/role.md`.

# Evidence

Raised by `claude-seat-assignment-archivist-review-instructions` during a review-instructions reading of `domains/seat-assignment.md` on 2026-08-09. That seat reported `bun tools/seat.ts --show` as the source for what a seat stating this domain reads — this document, `seat`, `agent-harness`, `foundational-layers` and `global` — and reported that the second statement of the set is exactly where a stale `ask` kind survived until this reading repaired it.

It declined to spend either remedy: a `lists:` document binding the set once, or a `glossary:` key here, both charge every reader at boot. `bun tools/checks/terms-in-reach.ts` runs clean, so no instrument says either is owed.

The filing seat confirms the Definition enumerates the five kinds and that `domains/role.md` declares a glossary naming all five. Not measured: the `--show` output, and whether any seat has in fact been stranded without the definitions.
