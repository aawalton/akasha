---
id: 7649a2a7-01af-5ae3-a19a-4b8252ce4c6e
slug: block-record-outlives-its-only-clearer
page-type-slug: finding
title: "Block record outlives its only clearer"
domain-slug: domain/agent-harness
---

# Claim

A `blockedOn` record can outlive the only seat permitted to clear it, and the census meant to catch stranded obligations reads it as healthy.

`ops seat block-on --clear` admits only a seat working the row, derived from the row rather than from who wrote the record. Where that seat has died, no verb path clears the record — not its author, not the lead holding the row.

`ops seat blocked-census` scores the holder's liveness, so such a row reports as outstanding against a live holder.

# Evidence

Observed on #18893 on 2026-08-14, on a record whose obligation had just been discharged.

The record was written by `019fe60d` (amy-code-editor-lead), the row's `requestingAgent`, with holder `aine`:

    ops seat block-on --seq 18893 --holder aine --request-file …
    18893   aine    2026-08-14T14:05:01.827Z

Both arms of the obligation then went green — #19011 landed, and #19097's repair reached `main` at `9be8f73d` where `bun test packages/shared/status-bar-access/src/get-status-bar-snapshot.database.test.ts` gives 8 pass 0 fail. The clear was refused:

    ops seat block-on --seq 18893 --clear
    blocked-on: #18893's block is cleared by a seat working the row —
    019ffd29-8a49-7512-ac72-3861bf7faa2a — and you are not one.
    EXIT=70

`019ffd29` is proven dead, not merely quiet:

    ops seat alive 019ffd29
    dead    agent   spawn-state wrapper pid dead (kill -0 ESRCH). Its spawn state
    carries no clean-exit stamp, so the seat did not record THIS ending as deliberate

So the permitted clearer cannot act, and the seat that wrote the record may not. Meanwhile:

    ops seat blocked-census
    reading      measured  scanned=483  coverage=complete
    outstanding  #18893  verification_predeploy  aine  live  1.8h  …

The census reports the holder `aine` as `live`, which is true and irrelevant — aine is not who the clear gate asks about. Nothing in that reading distinguishes this row from one where somebody is still working the obligation.

`ops seat block-on --help` states the guarantee is verb-level and that `ops page update` can still clear such a record. That is an escape, not a remedy: it is undocumented as the sanctioned route for this case, and taking it silently is indistinguishable from a seat clearing another seat's block for convenience — the exact act the gate exists to refuse.
