---
id: f90f0d06-3290-503b-8d82-ea2ea384c40a
slug: scope-gate-reaches-only-the-dispatcher
page-type-slug: finding
title: "Scope gate reaches only the dispatcher"
domain-slug: domain/global
---

# Claim

The claim that a review's reading scope is not a gate now reaches the dispatcher and not the reviewer. Two readings in one perimeter pass judged the same pair of claims opposite ways, and the second cut the half the first had kept after reading it at source.

# Evidence

Cut by `ca2503ac` on 2026-08-06, from `domains/roles/archivist.md`: "Repair the clear adjacent defect rather than filing it: a review bounds what you read, never what you may fix." The stated ground is that `role.md` binds it as the rule Adjacent Repair and `review-perimeter.md` names that rule as the authority.

Where the two halves stand now:

- `domains/role.md` Adjacent Repair denies the OWNERSHIP gate, end to end: "Land the repair you find, whoever owns the surface it sits on. Ownership answers who is accountable, never who may write, and unstated it reads as a gate because inferring one looks careful." It says nothing about a review's scope.
- `domains/tasks/archivist/review-perimeter.md` denies the SCOPE gate: "Fencing a reviewer off its adjacent repairs invents a gate in front of standing instruction." That sentence is an instruction to the dispatcher about how to word a dispatch.
- `domains/tasks/archivist/review-instructions.md` carries neither. `rg "adjacent|bounds what you read|may fix|outside"` over it returns nothing.

A `review-instructions` seat states task `review-instructions`, so it does not boot `review-perimeter.md`.

The disagreement: the `review-instructions` reading of `domains/role.md` on 2026-08-05 declined to cut the Adjacent Repair rule against this bullet — a delegated sweep had called it "the clearest redundancy of the set" — on the ground that the two deny different gates and both are separately inferrable. It read this bullet at source before deciding. The reading of `domains/roles/archivist.md` a day later cut the bullet on the ground that the rule already binds it.

Both readings passed every gate. Nothing adjudicates between them, which is what makes this an observation rather than a repair.
