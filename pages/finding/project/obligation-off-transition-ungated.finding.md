---
id: 1dd04654-e8ae-5ea5-a035-0bfcb66acba5
slug: obligation-off-transition-ungated
page-type-slug: finding
title: "Obligation off transition ungated"
domain-slug: barred-meaning/project
---

# Claim

The obligation gate is a property of `ops project move-to` rather than of the status
column, so an obligation written by any other path is reached by nothing. Every
boundary it fires at is a TRANSITION — `awaiting_manager_claim`,
`awaiting_lead_verification`, the terminal close — and an obligation created while the
row stands still crosses none of them. No widening of the gate reaches that case; the
remedy has to be a write-side act at the moment the obligation is created.

# Evidence

`ops project move-to --help` states both halves itself, read 2026-08-07. On the gate:
it fires "at THREE boundaries the same way, passed over or landed on:
awaiting_manager_claim, awaiting_lead_verification, and the terminal close (done /
not_doing / duplicate)." On the bypass: "**Unconditional ON THIS VERB**: there is no
--force escape on any of them. That is a property of move-to and NOT of the status
column — sibling verbs (`project update --properties-file`, `project finish --status`)
**write status without traversing any of this**."

`ops project update --help` confirms the open path: `--properties-file` takes "a JSON
map `{ propertySlug: value }` — slug keys, **stored verbatim**", and `obligations` is
an ordinary property slug. The help names what IS enforced for every writer — the
status property-definition's options list, and a page coherence rule about parking a
row on Alan — and neither touches obligations. The one thing it says is enforced at
the pages write boundary is the obligation record's own SHAPE, by a JSON Schema on the
property-definition, which makes a malformed record unwritable but says nothing about
whether an obligation is owned or resolved.

Two standing findings sit beside this and neither carries it.
`pages/finding/build-parent-commit/obligation-gate-fires-at-three-boundaries.finding.md` establishes
where the gate fires, and reasons from "the gate refuses in its own words" — an
argument that holds only for a seat crossing a boundary.
`pages/finding/project/obligation-opened-never-closed.finding.md` establishes that the parent-deploy
task opens obligations and no stage says to close one. Searched with `rg -uuu`
throughout: `"without traversing|bypass.{0,30}gate|no transition|moves no status|fires
on a transition"` over `~/memory/findings/` returns two lines, both from
`pages/finding/define-project/two-invariants-on-closing.finding.md` about a different subject.

Recovered from a lead's ruling under quarantine,
`dirty/skills/agent-harness/rulings/direction.md`, while emptying that source.
