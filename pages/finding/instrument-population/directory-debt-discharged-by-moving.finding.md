---
id: 906929c1-d762-5fab-b001-d89f5a59e07b
page-type-slug: finding
title: "Directory debt discharged by moving"
domain-slug: domain/instrument-population
---

# Claim

`check-predicate-derivation` fixes its family by directory, so a member's owed derivation declaration is discharged by moving the file out of those directories, and two files that left this way carry no declaration today while the ratchet reads green.

# Evidence

Measured 2026-08-07 against `~/code` at `ecf5f9518f`. A quarantined document reported the move on 2026-07-29; the discharge is confirmed here from the current tree rather than relayed.

`DECLARED_GUARD_DIRECTORIES` at `packages/infra/checks/src/lib/predicate-derivation-pending.ts:28` is four entries: `packages/infra/checks/src/checks`, `packages/infra/checks/src/lib`, `packages/infra/scripts`, `packages/alanwalton/projects/cli/src/pure`. Membership of the family is that list and nothing else.

Two citation grammars now live at `packages/agents/instruction-document/src/` — `source-position-citations.ts` and `doctrine-path-citations.ts`. That directory is not on the list. `rg -c 'predicate-derivation'` returns no matches in either file, and neither appears in `PENDING_DECLARATION`. They were on the shrink-only ratchet owing a statement of where their spellings came from; they are outside the family and owe nothing.

`PENDING_DECLARATION_COUNT` is **218**. The quarantined report recorded the ratchet moving 234 → 231 in the edit the check's own `parked-orphan` rule prescribed for the relocation. It has since fallen 13 further. Nothing in the number distinguishes a debt paid from a debt that left.

The instrument is not dishonest about the boundary. It declares it in its own text at `:25`: *"the directory set below is the family's own bound, chosen rather than derived: no authority in this system enumerates where hazard guards live … a guard in any other directory is UNEXAMINED rather than absent."* What is undeclared is the moment a member crosses out: the mover is prescribed an edit, takes it, and gets a green, with nothing in that transaction naming what was discharged — against the ratchet's own doctrine that every movement in either direction is an edit somebody reads.

Not established: how many of the 13 further removals were relocations rather than declarations. I read the current membership, not the ratchet's history.
