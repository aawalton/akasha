---
id: b648d91c-77a4-532e-ae26-1017edf94111
slug: stale-project-slot-on-resident-seats
page-type-slug: finding
title: "Stale project slot on resident seats"
domain-slug: page-type/seat
---

# Claim

Nothing clears a seat's `projectSeq` slot when the project it names finishes, so a resident seat goes on declaring a row it no longer works, and every reader that now resolves a seat's project off that slot inherits the stale answer.

# Evidence

Measured against the live fleet on 2026-08-14. Six of the fourteen live seats stated a `projectSeq`. Four named a row still being worked — `checks`, `implementation`, `implementation`, `documentation`. Two named a row at `done`:

- `nimue` stating 18944
- `amy-code-editor-lead` stating 18244

Both are resident seats, which is what makes the stale slot durable: a dispatch seat is retired soon after its row finishes and its slot goes with it, where a persona seat outlives any number of projects and keeps whichever row it last carried. Only a seat writes its own slot, so nothing else is placed to clear one.

This is not hypothetical. #19053 moved the wedge roster onto the slot, and on the first run against the live fleet `nimue` was admitted as a dispatch worker on the strength of 18944 and read `wedged` on every idle tick — a resident's quiet transcript being her healthy resting state. The project shipped a guard that drops a seat whose declared row reads terminal, with a failed read deliberately not counting as terminal. That guard makes the stale slot harmless to this one reader; it does not make the slot true, and the next reader to trust it will have to know to write the same guard.
