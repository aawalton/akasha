---
id: 592d894a-503a-4945-8e9e-99333dc476c1
page-type-slug: finding
title: "One mark over the whole engine means a producer that holds nothing can drop everything"
domain-slug: graph-system
slug: one-mark-drops-every-producers-answers
---

# Claim

The held-answer cache is keyed by a single mark hashing the whole graph engine's import closure, and every producer's answers are filed under that one mark. So a change to any file the engine reaches drops every answer every producer holds, including producers that never imported the changed file and hold no answers of their own. What the mark protects is real — an answer must not outlive the code that computed it — but it cannot tell whose code changed, so it charges the change to all of them.

# Evidence

Measured on 2026-08-27 in akasha, while adding the `contains` edge producer.

`markHere` in `cache/said/said.ts` computes one mark from `closureOf(bare, "graph/ask.ts", oids)`, and `saidUnder` uses that same mark for every `name` it files under. The closure of `graph/ask.ts` is 41 files.

Before the change, `.git/answers/said/` held 59,376 answer files under a single mark and a single name, `typescript`, totalling 233MB. `sweep` at `cache/cache.ts:37` removes every mark directory except the one being kept, so a mark that moves drops the whole set rather than ageing it out.

Registering `contains` put a 42nd file in that closure — confirmed present in the walk as `graph/edge-producer/contains/contains.graph-edge-producer.code.attachment.ts` — which moves the mark. The `contains` producer holds no answers at all, reading everything off the path. The 59,376 answers it invalidated all belong to `typescript`, which does not import it and whose extraction behaviour did not change.

The blast radius grows with the set: every producer added lands in the same closure, so each one invalidates every other one's answers on the day it lands, and again on every later edit to it.

# Not measured

What re-extracting 59,376 answers costs in wall time, so the price of an invalidation is unknown in seconds rather than in files.

Whether a mark per producer would be correct. Producers share helpers and one can read another's output, so a narrower mark risks holding an answer whose real inputs moved — the failure this mark exists to prevent, and the more expensive one to have.
