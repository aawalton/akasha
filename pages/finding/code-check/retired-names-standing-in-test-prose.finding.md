---
id: 484d383e-df63-57ec-9087-6e3acac621b6
slug: retired-names-standing-in-test-prose
page-type-slug: finding
title: "Retired names standing in test prose"
domain-slug: domain/global
---

# Claim

Ten test files carry retired project-status names in prose, most naming a retired gate as if it were live, and the retired-vocabulary check's declared test-file blind spot is what keeps them out of reach.

# Evidence

Reported by #18641 while folding `check-retired-status-source-vocabulary` into `check-retired-vocabulary`, and left standing rather than repaired.

The sites:

- `boot-digest.unit.test.ts` — 4 sites
- `synthetic-config.unit.test.ts` — 3 sites
- `inbox-stoplights.unit.test.ts:136`
- `slug-column-attribute-invariant.database.test.ts:26`
- `show.cli.test.ts:104`
- `moss-continuation-roundtrip.model.test.ts:15`
- `awen-fixture-render.browser.test.ts:16`
- `reader-font-swap-reflow.browser.test.ts:27`
- `readers.unit.test.ts:5`
- `persona-chat-classify.unit.test.ts:101`

Two distinct cases sit in that list and they want opposite treatments. Most name a retired gate as though it were still live, which is the ordinary defect — the prose teaches a reader a word the system stopped writing. Two use `passback` as ordinary English, where the word is not a status name at all and an exclusion rather than an edit is the correct answer.

Why it was not repaired in the row that found it: editing these rules on what four other packages meant by a retired gate name, which is a judgment about each package's subject rather than a mechanical rename. A row folding two checks together is not placed to make it.

What makes the residue reachable at all is that `check-retired-vocabulary` now opens every file class the graph names, after #18639. The blind spot that keeps these ten out is the test-file answer, which after #18641 belongs to the spelling rather than to the check — `RetiredWord` carries `testFiles`. So closing this does not need a new mechanism, only a decision per site.

What is unsettled: whether a retired status name appearing in a test fixture or a test's prose is a defect at all. A fixture may legitimately exercise the old name, and a test asserting a migration's behaviour has to spell what it migrated from. Deciding that is what stands between this list and a repair.
