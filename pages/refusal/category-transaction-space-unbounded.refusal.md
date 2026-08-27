---
id: 2f82b27e-75bb-576d-a33e-19a8bc651fba
slug: category-transaction-space-unbounded
page-type-slug: refusal
title: "Category transaction space unbounded"
holes:
  - folder
  - ceiling
---

# Refusal

The walk over the rules under {folder} decided the transaction space in part rather than whole. What a walk that stopped early reports is not a proof: it finds nothing wrong over everything it never reached, in the same words as a walk that reached all of it.

A rule comparing `description` stops the walk before it starts. `merchant` is spelled out of `description` by the vocabulary at `pages/category-rule-merchant/merchants.category-rule-merchant.md`, so a rule reaching for the raw description puts the two out of step, and no transaction the walk could pose is one the live run would meet. Compare `merchant` instead, and add the pattern to that vocabulary where it is not there yet.

Otherwise these rules tell apart more than the {ceiling} transactions one run enumerates, or they cover every value the walk can spell for one field, which leaves no value over to pose the transaction nothing claims. The count grows with the values the rules compare against rather than with the number of rules, and `contains` values grow it fastest, every one of them standing beside every other. Give a rule a merchant to sit under, or take a value out.

Where the rule set is meant to be this large, raise `CEILING` at `tools/lib/rules-partition.ts` and pay the run time. That one number is the ceiling every rule set is walked against.
