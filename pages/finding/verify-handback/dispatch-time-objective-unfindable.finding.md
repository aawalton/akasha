---
id: 9159f88a-55bd-5b88-a5c5-3bc9ac8f4a97
slug: dispatch-time-objective-unfindable
page-type-slug: finding
title: "Dispatch time objective unfindable"
domain-slug: task/verify-handback
---

# Claim

A lead verifying a hand-back has no reliable way to find the objective the project was dispatched against. The current document may carry criteria the delivering seat amended itself, and the `awaiting_worker_seat` commit predates any redefinition the definer made between authorizing the row and a seat taking it — so both obvious anchors can show something other than what the seat was told. Read against the wrong one, work that did exactly what was asked reads as work that did the opposite.

# Evidence

On 2026-08-10, verifying #18361, the lead read the objective from the memory repository at the `projects: #18361 is at \`awaiting_worker_seat\`` commit `c8ece361` — the anchor that names the dispatch authorization. It read: "The check goes, sources and registration together", a REMOVAL, with a second criterion about preserving the specification.

The delivering seat had repaired the check instead: widened its predicate, fixed one addon, and made the corpus parse once. Against that anchor the hand-back reads as a seat that did the opposite of its objective.

The anchor was wrong. `git log` over #18361's document shows `c5305796`, a whole-document `memory: write`, landing between the `awaiting_worker_seat` commit and the move to `understand`. Its diff replaces both criteria with the three repair criteria the seat actually built against, and its timestamp is 2026-08-10 11:38:40 -0600 — before the seat was spawned at 12:29. The project's title, "Repair check-addon-cross-cluster-attach", had matched the repair reading throughout and was the signal that something was off.

The other anchor is no safer in general: on #18347 the same day, a delivering seat amended its own first criterion mid-run to one the run had met and ticked it, so the document as handed back stated a criterion nobody had set.

NOT ESTABLISHED. How often a definer amends an objective after the authorization commit — this is one observed case. Whether any tooling exposes the dispatch-time revision directly was not surveyed; the reconstruction here was done by hand from `git log` on the document. Whether the `understand` move is a sound anchor was not tested either: it is later than dispatch, so a definer amending during the seat's own understand stage would defeat it too.
