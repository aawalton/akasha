---
id: a8ede105-7974-5f69-9881-34211013389b
slug: observational-criteria-unverifiable
page-type-slug: finding
title: "Observational criteria unverifiable"
domain-slug: domain/work-system
---

# Claim

A project verification criterion that can only be met by waiting for something to happen in production, rather than by running a check and reading a verdict, is not a valid verification criterion; the underlying obligation to watch for the condition belongs to a person as a standing watch, not to the project row.

# Evidence

Ruled by Alan 2026-07-25, captured by dalla: "Projects can only have verification criteria that can be directly run and verified. Waiting for something to happen is not automated verification and should instead be an agent note for the owner to keep an eye out for."

Case that produced the ruling: #16203 was parked non-terminal at verification_automated on a two-sided criterion requiring production to spontaneously exhibit an over-cap recovery. Its worker reported side 1 "UNEXERCISED", evidenced by absence of a production event since deploy (3000 Loki lines, 224 coordinator lines, zero matches, after catching two false zeros from a wrong namespace) — a sound control on an unmeetable criterion. dalla then recorded the deferred production injection as "a deferred obligation with its trigger" on the row itself, preserving the anti-pattern as apparent diligence.

Three properties named: (1) no verdict is producible on demand, so the row parks indefinitely; (2) observational framing migrates into scope-creep debate rather than a failing test; (3) it launders an owner's watch obligation onto the row, so neither the row closes nor the person actually watches.

Applied: #16203 was rewritten with both criteria restated as runnable tests at the DispatchCiDeps.loadAllWorkflowConfigs injectable seam; the production observation moved off the row to dalla's standing watch 249744ba-21c4-4bcc-898c-040e5a9066b5.

Open scope, not yet decided (define-front not run): document the rule in the project-lifecycle outcomes doc; add a check/lint over acceptance text for observational phrasing ("wait for", "once a real", "monitor for"); or require a persona watch id before a row with an observational criterion can be stamped. The doc alone may suffice.

Related: #16176 (suppressions record a reason but not an expiry condition) is the same family — a justification whose continued validity nothing watches.

Was project #16272, status someday_maybe, domain work-system, live-on commit.
