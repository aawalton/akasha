---
id: 16f09e33-0baa-5525-b2c9-d171813564e5
slug: three-children-in-reach-of-nobody
page-type-slug: finding
title: "Three children in reach of nobody"
domain-slug: rules-engine-rule-set/category-rule
---

# Claim

Three of this domain's children — `category-rule-counterpart`, `category-rule-description`, `category-rule-match-condition` — declare no path and are named in no `glossary:`, so nothing puts them in front of the person writing a category rule.

# Evidence

`bun tools/glossary.ts --domain category-rule` lists seven children. Four are reachable by a path: `category-rule-code` and `category-rule-agent` govern the two rule folders, `category-rule-order` the order document, `category-rule-merchant` `monarch/merchants.md`. The other three govern nothing, and `domains/category-rule.md` names no `glossary:`, which is the only other way a domain reaches a reader.

`bun tools/governs.ts --file-path monarch/category-rules/code/netflix.md` lists what a rule author must read: sixteen documents, and none of the three is among them.

What the author is missing. `domains/category-rule.md` tells them "a rule may require a counterpart"; `category-rule-counterpart` is where a counterpart is defined as the exactly opposite amount in another account, claimable once, the window the only knob the rule holds. So somebody writing `counterpart-within-days: 7` has read that the key exists and nothing about what it does. `category-rule-match-condition` carries how a condition's field decides which comparisons it takes; `category-rule-description` carries that Monarch's title and the bank's text are one field with a normalizer between them.

The same hole widened on 2026-08-13: `889c9b104` moved the principle **The Field That Survives** off `domains/category-rule.md` to `category-rule-merchant`, which governs `monarch/merchants.md` only. A rule author writing a merchant pattern is no longer handed it.

`bun tools/run-checks.ts --check terms-in-reach` does not see this. It keys on a capitalised term in prose; these documents' words are ordinary lower-case ones.

What it does not settle: whether the fix is a `glossary:` here (which grows what every reader of a rule file pays at boot), a path of their own, or folding them upward. Filed 2026-08-14, from a line-by-line reading of `domains/category-rule.md`.
