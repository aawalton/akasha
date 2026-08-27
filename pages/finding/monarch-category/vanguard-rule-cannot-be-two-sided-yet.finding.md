---
id: 391f1ee7-6c00-5e22-aaee-11aa631d4771
page-type-slug: finding
title: "Vanguard rule cannot be two sided yet"
domain-slug: page-type/monarch-category
---

# Claim

The Vanguard and Cash Plus transfer rules are one-sided, and the two-sided form Alan ruled for cannot be written until an investment transaction arrives to pair against.

# Evidence

Alan ruled on 2026-08-07 that the Vanguard rule should be two-sided, setting Buy or Sell inside the Transfers group, rather than the one-legged shape every other brokerage row takes today. He turned Monarch's beta Investment Transactions on the same day.

Both categories stand. An earlier reading of this finding said they did not, and that reading was taken against a corpus that could not hold them: the sync built its category list out of fetched transaction bodies, so a category no transaction used was invisible here. Corrected the same day — the sync fetches the list itself and lands 52 categories where it had 46.

There is still nothing to pair against. Every Vanguard and Betterment row inside the twelve months to 2026-08-07 — eighteen rows, $1.35M — has no counterpart anywhere at the opposite amount within seven days. Neither institution carries an account page, so the second leg does not exist to be found.

The Cash Plus account `...2749` is blocked the same way. Its ten rows in that window all sit on that one account with no counterpart anywhere. Alan ruled the other leg a Vanguard investment account that created none until then, so the `Cash Plus sweep` rule carries no counterpart clause.

What has to be settled when the first investment rows land: whether a checking debit pairs to ONE investment row or to several fills. A $990,000 `VANGUARD BUY INVESTMENT` debit on 2025-12-23 could arrive back as one row or as a dozen. Every pairing rule standing today requires its counterpart match to be unique and refuses to guess where it is not — so several fills is not this rule with different clauses, it is a rule shape the engine does not have.
