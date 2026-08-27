---
id: e63ab34e-16a6-59b3-974e-292b71393fa3
page-type-slug: finding
title: "Rename drops a verb unasked"
domain-slug: domain/ops-cli
---

# Claim

Nothing asks whether a rename or a removal takes an `ops` verb away. `tools/gates/command-kept.ts` asks the question only of a write to a file that already stands and already declares one, so both halves of a rename pass it unremarked, and `ops instructions rm` never reaches it at all.

# Evidence

`check-commands-kept` asked this in branch CI and was retired with every other check that reads the instructions tree. `command-kept` is what is left, and it judges one file against its own previous body.

Measured against the gate as it stands, with `tools/seat.ts` as the subject:

- a body that drops the declaration, written at `tools/seat-row.ts` — a path not yet on disk — returns `not-applicable`, on the reason `the file is not there yet, so this write drops no declaration`
- the same body written back over `tools/seat.ts` returns `fail`

So the two arms of a rename both pass: the new file is exempt for not existing, and the old file is never written. `tools/rm.ts` runs `hookLiveness` and `holdSeat` and no others — its own header says the gate set inverts on a removal because a removal carries no body — and `tools/mv.ts` removes its orphans through that same pair. `command-kept` is in neither set.

The case is not hypothetical: `tools/pin.ts` becoming `tools/seat.ts` nearly cost the fleet a verb, and the residue of a comment sweep that took the declarations out of five tools and was reverted at `262deee67` is still standing in `tools/`.

Since #19012 the 42 `ops instructions` and `ops memory` verbs are derived from these declarations in this repository alone, so the gap now carries a whole namespace rather than half of one.
