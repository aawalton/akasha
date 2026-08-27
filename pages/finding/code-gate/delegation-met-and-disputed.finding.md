---
id: d4504d03-a28e-5163-afd8-4e950ac02723
page-type-slug: finding
title: "Delegation met and disputed"
domain-slug: domain/global
---

# Claim

Alan delegated the suppression gate to the code-harness domain, the condition he set for it returning there has been met, and the only two records of it give opposite answers on whether dalla may simply take it back or must wait for him. Both are quarantined and queued for removal, so the delegation, the met condition and the disagreement all go with the sweep.

# Evidence

Read 2026-08-07 while emptying `dirty/skills/ci/rulings.md`.

The delegation. That source says "It is a gate Alan delegated to this domain, so taking it back needs no permission — only that dalla is running, and one edit to gates.md." It is the only statement anywhere of whose the gate is.

The condition is met. It lapses "when dalla runs on the new harness, which is what standing this domain up begins". `ops persona exists dalla` exits 0; `domains/personas/dalla.md` is live with `championed-domain: code-harness`; `domains/code-harness.md` is live with `persona-champion-slug: dalla`; `ops persona digest dalla` exits 0 with real work — three singletons at `awaiting_lead_definition`, one at `awaiting_alan_verification`, two in flight.

The contradiction. `dirty/maybe-keep/knowledge/gates.md`, kept by another seat from `dirty/knowledge/gates.md`, says of the same gate: "**Athena holds it** … It returns to dalla once dalla's domain is up; when that happens is **Alan's call rather than a predicate an agent computes**." One record says no permission is needed, the other that it is his call. Nothing live adjudicates them and both are queued.

Nothing live names a holder at all. `rg -uuu -in "approvals|gate holder|gate-block|suppression" domains/ tools/` returns nothing — *suppression* does not appear in the live tree. `ops seat gate-block --help` reads "The holder is an argument and is never guessed … this verb refuses a holder no agent row answers to." The routing target the source names, `dirty/docs/gates.md`, is gone: `ls dirty/docs/` is empty.

`code-gate/gate-holder-nowhere-live.md` measures that last half and ends "Not judged: whether the repair is promoting the quarantined keep, stating a holder on each document that names a gate, or retiring the verb". What this adds is the three things it could not see: Alan already said whose the gate is, his condition has fired, and the two surviving records disagree about what happens now.

NOT MEASURED: which record is right. That is Alan's to say.
