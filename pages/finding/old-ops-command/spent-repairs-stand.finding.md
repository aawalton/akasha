---
id: 66495936-cdef-5c0d-8039-98523c212496
slug: spent-repairs-stand
page-type-slug: finding
title: "Spent repairs stand"
domain-slug: page-type/old-ops-command
---

# Claim

A command written as a one-time repair stays in the surface after the repair is spent, and nothing on the command says the repair is over.

# Evidence

`ops claude-account heal-at-limit-marks` clears at-limit marks latched past the five-hour scale by two bugs that are fixed. Its own help states that the corrected setter can never write such a mark, so the verb only ever matches rows the old one left, and a second run finds nothing.

It stands among the 759 verbs `ops` lists, carries a domain document like every other verb, and `verdict-coverage` counts it among the 689 pending classification. Neither its declaration nor its document nor the registry separates it from a verb still needed.

Not measured: whether any row still carries a stale mark; how many of the other 758 verbs are one-time repairs, for which the `migration` namespace's twelve verbs are the first place to look; and whether `tools/commands-retired.txt` is open to this class of verb or reserved for verbs that were replaced.
