---
id: 5636fbdb-6b6c-57d3-9cda-12b53c223373
page-type-slug: finding
title: "Rule comment counts unremeasured"
domain-slug: page-type/monarch-category
---

# Claim

Every rule in `monarch/` carries its own corpus measurement in a code comment, and nothing re-measures any of them, so a count that has gone false reads exactly like one that was checked this morning.

# Evidence

`insuranceRules` opened with "TWELVE ROWS IN TWELVE MONTHS AND NOTHING ELSE STANDS IN THE CATEGORY". Thirteen rows stood in Financial when that sentence was written: twelve State Farm premiums and one Banner Life premium of $1,136.37 on 2025-09-03, which Alan had moved into the category by hand shortly before, telling the seat to write a rule for it when the category came up. The rule was written to cover a category the comment asserted was already whole, so the missing rule and the false count went in together and neither contradicted the other.

Alan found it by asking whether Financial had been done. Nothing in the repo would have.

Fifteen rules stand as of 2026-08-07, and the comment on each states a measured count over a stated window: twelve fast offerings, ten rows on `...2749`, sixty-five Venmo debits on chequing, thirty-four unique pairings and two ambiguous, five Banner Life rows since 2021, twelve rows for each of the three utility rules. Every one was true when taken. The corpus grows daily and the windows are anchored to fixed dates, so each of these decays on its own schedule, silently, and a reader has no way to tell a live figure from a dead one short of re-running the query themselves.

The measurements are worth keeping — they are the evidence a rule was fitted to something rather than guessed. What is missing is anything that reads them back.
