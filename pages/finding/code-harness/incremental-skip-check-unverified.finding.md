---
id: 5db3ebaf-c85d-51f5-a9e3-034cb4799147
page-type-slug: finding
title: "Incremental skip check unverified"
domain-slug: domain/global
---

# Claim

The incremental-skip gate's refusal to credit a predecessor pipeline carrying subset provenance (`onlyCheckNames` non-null) is checked only by unit tests, not by a standing query over the live 12-row `prevPassSkips` population, and that property's positive control (#16692, which credited #16689's `--only check-service-typecheck` run and came back with `prevPassSkips [preparation, check]` and zero workflow rows) has not yet been used to prove such a query would actually fire.

# Evidence

Project #16006 (domain `code-harness`, status `someday_maybe`, `live-on: deploy`). Carried no objective — captured but never defined; the text below is its capture, moved off the row's retired `notes` attribute on 2026-08-15.

Follow-up from #15966. The incremental-skip gate now refuses to credit a predecessor carrying subset provenance (`onlyCheckNames` non-null). This project's proposal is to make that property continuously checkable against reality rather than only against unit tests.

Proposed shape: a standing query over pipelines carrying a non-empty `prevPassSkips`, asserting that each one's immediately-preceding pipeline on the same branch ran full (`onlyCheckNames` null). Lifetime population is 12 rows, so the query would be nearly free.

Why a query and not a formal spec (settled on #15966, not to be re-litigated): a FizzBee spec of the pure decider would model the one layer that is now trivially correct and stay blind to the shell and the trigger-side materialization join, where both real defects actually lived.

Athena's condition, named as load-bearing: the check must be shown to fire on #16692's row before anyone trusts it. A standing check over a twelve-row table is silent almost every day, and silence from nothing wrong is indistinguishable from silence from blindness — the same defect class #15966 catalogued. A positive control is required before trust.

#16692 is named as the natural positive control: it credited #16689's `--only check-service-typecheck` run, came back with `prevPassSkips [preparation, check]` and zero workflow rows. The other 11 firings credited full predecessors and must stay silent — so the check has both a known-positive and a known-negative population already sitting in history, staged by nobody as of this capture.
