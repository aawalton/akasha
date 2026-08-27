---
id: e425beb2-06db-5cd2-98ef-6acc4ed6a2c2
slug: three-slot-measurement-rule
page-type-slug: finding
title: "Three slot measurement rule"
domain-slug: domain/instrument
---

# Claim

For any measurement, the reliable check against censoring, scope selection, and unit/quantity confusion is a three-part sentence: name what is counted, over what population, and as of when — then check each part against the claim being made. An earlier two-population form (observable population vs. reasoned-about population) is superseded, because it misses cases where two different quantities share a denominator and a unit.

# Evidence

Project #16344 (domain: instrument, someday_maybe, live-on: commit). No initiative named.

Rule, credited to worker-16225: for a measurement, write a sentence naming WHAT is counted, OVER WHAT population, AS OF WHEN. WHAT catches substitution (`kubectl top` read as a `describe node` answer). OVER WHAT catches right-censoring/scope (a silently truncated population). AS OF WHEN catches staleness. Supersedes an earlier two-population form (observable vs. reasoned-about, also worker-16225's), which misses cases where two quantities share a denominator and unit.

The project's body carries a banner: appending this correction below the original statement left the superseded rule standing where a reader starts — the exact defect described, committed while filing it.

Five instances in one evening prompted the rule, none an arithmetic error: (1) a cap docstring citing "p95 150s" where the p95 IS the cap, since it SIGKILLed every sample that would exceed it; (2) a p95 of 76.6s from n=75 vs. the honest 91.7s from n=541 over full retention; (3) a "~22s" graph-build cost quoted all evening that was a workstation number, when production is 42.8s floor / 54s p50 / 424s max, quoted by the same agent who had warned about that trap two hours earlier; (4) a restored `load_graph` metrics series that could record only loads that finished (a SIGKILLed child writes no stdout); (5) "node-04 sits at 93% as its steady state" (the filer's own, on #16325), measured twice 20 minutes apart, both samples inside one 4Gi transient's 2h55m lifetime.

A sixth, different flavour: `kubectl top` (28%) read as a `describe node` answer (66%) — a 38-point spread, same node/minute; observable is bytes resident, reasoned-about is bytes the scheduler committed.

Why "be careful" has not worked: a censored series is correct on every sample it holds and silent about the ones dropped, so it reads as clean data. All six were caught by re-measurement or by writing the sentence, none by scrutiny of numbers.
