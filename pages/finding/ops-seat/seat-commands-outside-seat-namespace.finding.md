---
id: 65c213da-af25-58cc-b3f8-1ae03718c4d8
page-type-slug: finding
title: "Four commands whose subject is a seat are invoked through ops instructions, against the namespace's own intent"
domain-slug: domain/ops-seat
---

# Claim

`ops seat`'s intent says every command whose subject is a seat is invoked
through that namespace, and four such commands are invoked through
`ops instructions` instead.

The sharpest case is a read and its write standing apart: `ops instructions
seat` states a seat's attributes and `ops seat whoami` reads those same
attributes back.

# Evidence

`domains/ops-seat.md` states under Intent: "Every command whose subject is a
seat is invoked through this namespace."

`ops instructions seat`, `ops instructions seat-name`, `ops instructions
sweep-seats` and `ops instructions compose-boot` each take a seat as subject.
Their command documents sit at `domains/commands/ops-instructions-seat*.md`
and name `ops-instructions` as owner, so the placement is stated rather than
accidental.

`ops seat whoami`'s own help names `ops instructions seat` as what sets the
values it prints.

NOT MEASURED: whether the intent line or the placement is the thing that is
wrong. A namespace organised by subject and one organised by which repository
a command writes to are both coherent, and which one this system means was not
established. No caller was surveyed for what a move would cost.
