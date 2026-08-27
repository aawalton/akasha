---
id: 9c3ce057-a698-570a-81da-d59727d3b219
slug: nothing-consumes-a-keep
page-type-slug: finding
title: "Nothing consumes a keep"
domain-slug: domain/global
---

# Claim

Nothing consumes what `ingest-instructions` keeps, and its no-approval design rests on a separate reading by whoever owns the destination.

# Evidence

Reported by the review of `domains/tasks/archivist/ingest-instructions.md` on 2026-08-16, which searched `domains/**` and `page-types/**` for "maybe-keep" and "promote" and found two hits, both inside that document: no task, no role responsibility and no command promotes a kept claim to live instruction. The history: 291 files reached `dirty/maybe-keep/`, and the sweeps that read them are logged "none cleared the bar" in ab5bbb0ab, 303bed3f7 and 5fa77d8a6 before the shelf went entirely. The reviewer states stage 3 spends its two most expensive steps producing output that has never had a live consumer, and did not act. Not re-checked here.
