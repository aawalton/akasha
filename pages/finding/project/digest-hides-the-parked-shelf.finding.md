---
id: 5e720e69-e320-5d44-86d4-619f3066c13c
page-type-slug: finding
title: "Digest hides the parked shelf"
domain-slug: barred-meaning/project
---

# Claim

The boot digest reports no work while parked rows wait. `ops persona digest olwen` returns "No open projects, contributed conditions, standing watches, or owed pings" at the same moment `ops project list --owner olwen --status someday_maybe` returns four substantive rows. The digest is the surface a lead boots from and a parked row is not open, so a shelf is invisible from it and only a second query nobody is sent to run renders one.

# Evidence

Measured on 2026-08-07 while ingesting `dirty/skills/design-system/rulings.md`.

`ops persona digest olwen` returns, in full: "No open projects, contributed conditions, standing watches, or owed pings." Its own preamble calls itself "Live owner-scoped work-state for `olwen`".

`ops project list --owner olwen --status someday_maybe` returns four rows: 16108 block clipboard, 16107 binding-id prefix consistency, 16106 the mac L0 key table, and 15792 "Design-system keyboard-control UX standard + shared primitives". Each is a titled, substantive capture.

Three digests, run the same day, all empty: `thea`, `elin` and `olwen`. Two of those three domains proved to have live standing behind the quiet — a stood-down cadence and a dormancy ruling — and this one has a populated shelf. So an empty digest was wrong about the domain in all three cases I looked at.

The same shape stands on amy: `ops project list --owner amy --status someday_maybe` returns twenty rows, measured 2026-08-09.

The gap is not that a parked row is counted wrong; it is that nothing on the digest says a second surface exists. `ops persona --help` describes `digest` as "THE pull for live owner-scoped work-state" and "the role that owns the state calls this at boot and whenever it has lost the thread." A lead who does that and stops has seen none of the shelf.

`pages/finding/project/shelved-row-affords-unearned-moves.finding.md` is the adjacent claim and not this one: it is about what moves a shelved row affords once you are looking at it. This is about not looking.

Not judged: whether the digest should carry a parked count, or whether the boot instruction should name the second query.
