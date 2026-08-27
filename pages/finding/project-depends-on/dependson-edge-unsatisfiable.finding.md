---
id: c948a52f-e03e-5f33-8c4c-845652b4ffcc
slug: dependson-edge-unsatisfiable
page-type-slug: finding
title: "Dependson edge unsatisfiable"
domain-slug: domain/global
---

# Claim

An intra-tree `dependsOn` edge between a manager's children is unsatisfiable by construction: `isProjectUnblocked` releases only on a terminal status, but the manage contract forbids a verified child from reaching terminal before its manager's deploy, so the edge releases only after the thing it gates is no longer needed.

# Evidence

Project #17201 (status someday_maybe, live-on deploy, domain `project-depends-on`); notes captured 2026-08-15, no objective written. Reported by #16958's manager after all three wave-2 children read not-dispatchable with their only dependency already verified, committed, and parked.

Mechanism: `isProjectUnblocked` releases a dependency only on a terminal status (`done`/`not_doing`/`duplicate`). The `manage` contract forbids a verified child reaching terminal before the manager's own deploy, after every child in the tree finishes. So the release condition becomes reachable only once the thing it gates is no longer needed.

Terminality is a sound proxy in one place, false in the other: the gate's rationale names racing an in-flight dependency into a file collision, but a manager-verified child is committed and editing nothing — the hazard is gone. On a lead's top-level rows, terminal and resolved coincide, so the proxy is invisible and correct; on a manager's children they never coincide, since the contract holds children non-terminal until deploy.

Why a defect, not an inconvenience: `ops project claim` carries no dependency term, so `--dispatchable` is a discovery query, not a gate. A manager who knows its tree dispatches past it and loses nothing; one who trusts the query concludes its tree is finished, since an empty result is indistinguishable from nothing-left-to-do.

Ranked cause: a second instance of "one declared lifecycle model rather than a local copy per consumer," ranked from a prior cut on a dispatch-readiness read that answered a lead's own question with an empty queue while rows sat mid-flight elsewhere.

Not decided: whether the fix is a non-terminal "resolved" state before deploy, a dependency predicate reading resolution rather than status, or a shared lifecycle model — whether the edge should exist at all is owed first. A fix must keep a real in-flight dependency blocked while releasing a verified parked one.
