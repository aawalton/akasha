---
id: 5b30b1de-6861-5ed4-a861-0c8aec56e50c
page-type-slug: finding
title: "Dispatchable terms decoupled"
domain-slug: domain/global
---

# Claim

The `--dispatchable` paragraph in `ops project list --help` was composed at build time from the gate's own term list so that a term added to the gate reached the help in the same edit. Moved here it is a literal, so a fourteenth term would now reach the gate and not the help.

# Evidence

In the code repository the sentence was not written out. `list-help.ts` built it as `Object.values(DISPATCH_GATE_TERMS).join("; ")` over the thirteen terms declared in `projects-core/src/lib/dispatch-predicates.ts`, and that constant's own docstring states the coupling as its reason for existing: the help and the predicate are one edit because they read one list.

A help block is a top-level declaration and this repository resolves a code-repository module asynchronously, so nothing in the help can await. The composed sentence therefore had to cross as a literal — 1265 characters of it — and the coupling did not cross with it.

What is lost is narrow and specific. The thirteen terms carried across correctly: `ops project list --help` is byte-identical before and after the move, which is what says the transcription is right today. Nothing reports it going wrong later. A term added to `DISPATCH_GATE_TERMS` changes which rows the queue returns and leaves this paragraph describing the previous behaviour, and the two would disagree with no instrument reading both.

The same shape holds for `ENTITY_LIST_MAX` (500) and `AWAITING_LAYER_VALUES` in the same file, though both are single values rather than a composed sentence, and `--awaiting`'s is re-validated inside the code repository's own `resolveArgs`, so a divergence there surfaces as a refusal rather than as silence.

It is not the status vocabulary's shape: that one is declared in this repository and read from `tools/lib/project-statuses.ts`, so it carries no drift at all.
