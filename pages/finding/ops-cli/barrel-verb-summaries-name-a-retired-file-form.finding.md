---
id: ea216e63-abf6-5fba-aee1-fab9f2496f43
page-type-slug: finding
title: "Barrel verb summaries name a retired file form"
domain-slug: domain/ops-cli
---

# Claim

`ops check-producer-barrel` and `ops check-enricher-barrel` each summarise themselves against a file form project #9800 retired. The listing line is wrong where each verb's own longer description is right, so the one-line answer a reader gets from `ops --help` is the stale one.

# Evidence

Found 2026-08-13 by the seat writing the domain documents for the eight namespaceless verbs.

Each summary says the verb verifies the barrel "against discovered `*.producer.ts`" / "`*.enricher.ts`" files. Discovery post-filters on `*.{node,edge}.producer.ts` and `*.{node,edge}.enricher.ts`, and has since #9800 — a bare-form file is invisible to both the barrel and the gate. So the summary names a form that no longer participates.

Two further things stand beside it, both seen in the same reading and neither repaired:

The producer handler carries a comment block describing detection of barrel references that no longer match a discovered file — "if every discovered producer is named AND the line count is consistent with discovery's tuple size" — and no such detection is implemented. Drift is one-directional: a producer missing from the barrel fails, a barrel naming a producer that no longer exists passes. The comment describes a symmetry the code does not have.

`ops check-addon-sandbox-safety` calls `eso-sandbox.manifest.ts` an "allow-list" and then says it flags any reference to a stripped namespace, member or bare global. What it consumes reads as a strip-list. Wording only.
