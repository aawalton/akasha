---
id: 2bc9a69d-2608-538a-b75b-c1834f41e675
page-type-slug: finding
title: "Unsettled walks past a rule that did not fire"
domain-slug: rules-engine-rule-set/category-rule
---

# Claim

`monarch/history.ts` `unsettled()` walks past a rule that matched and did not fire, so an unpaired transaction is settled by the NEXT rule that matches — which is what `domains/category-rule.md` says does not happen.

# Evidence

The Design line reads: *"A rule requiring a counterpart settles nothing where none pairs uniquely, and its transaction goes to the last rule rather than to the next one."*

The proposal path obeys it. `monarch/propose.ts` keeps `unpaired` and `ambiguous` in each row's decided list, and `monarch/report.ts` takes `decided[0]` as the decider — "The FIRST match decides, and `decided` arrives most-specific-first, so its head…". `monarch/apply.ts` refuses to apply either outcome, saying "Alan ruled that these fall through to semantic review rather than being guessed between".

`unsettled()` in `monarch/history.ts` does not:

```
for (const rule of rules) {
  if (!clausesMatch(rule, row)) continue
  if (fires(decide(rule, row, await readNeighbourhood(rule, row)))) { settled = true; break }
}
```

`continue` fires only where the clauses do not match. Where they match and the decision is `unpaired`, `several counterparts` or `counterpart contended`, the loop goes on to the next rule, and a later rule that matches and fires marks the row settled.

`monarch/review.ts` `selectSet` is the caller, so this decides which rows a person is shown. A card payment whose opposite leg is missing or contended, and which a broader merchant rule below also matches, is dropped from the review set and takes that rule's category — instead of reaching semantic categorization, the last rule in `monarch/category-rules.md`.

The function's own header states the intended rule correctly ("SETTLED MEANS THE RULE FIRED… a card-payment rule that matched a transaction and then found two candidate legs, or none, reached no conclusion"), so the header and the loop beneath it disagree.

Found while reading `domains/category-rule.md` line by line, 2026-08-14. Not measured against live data: what is shown is the code path, not a count of rows it has moved.
