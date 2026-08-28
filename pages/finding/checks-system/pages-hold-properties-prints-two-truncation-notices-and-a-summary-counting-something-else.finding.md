---
id: 58a02bfb-bde6-5f8c-8782-28e75592cbb1
page-type-slug: finding
title: "pages-hold-properties prints two truncation notices and a summary counting something else"
domain-slug: domain/checks-system
---

# Claim

Three separate wordings in `tools/audits/pages-hold-properties.ts` make its output unreadable to a careful reader, and they compound. One run emits two independent truncation notices, so the visible tail understates the hidden remainder. The summary counts pages while the list counts refusal lines, so the two numbers of one run cannot be reconciled and differ threefold. And the phrase for unjudged keys says the opposite of the messages printed beneath it.

A reader who trusts the summary undercounts the work threefold. A reader who trusts the truncation notice overcounts the pages threefold. A reader who reads the visible tail alone gets a number that is neither. All three readings were taken, by two readers, and every one of them was wrong.

# Evidence

Measured against `main` on 2026-08-28, before the faults it was reporting were cleared. The counts below are now zero and the three wordings are unchanged.

**Two truncation notices.** `SHOWN` is 12 at line 14, `first()` at lines 16-18 appends `… and N more` past it, and lines 80-81 call `first()` twice — once over `unjudgeable`, once over `refusals`. That run held 47 unjudgeable and 382 refusals, so it printed 12 lines, `… and 35 more`, 12 more lines, and `… and 370 more`: twenty-six lines with two remainders, the larger of them last. A reader taking the visible tail as the whole answer read three lines plus 370 and reported 373, which is neither the 382 refusals nor the 429 total, and the 35 above went unseen.

**A summary and a list counting different things.** Line 73 builds `${measured - holding} outside them`, which counts pages. The list counts refusal lines. That run reported `122 outside them` while its own truncation notice said `370 more`, because one page carries several refusals — the readout pages carried up to nine each, 133 refusals across 16 pages. Both numbers are true of the same run. Nothing in the output says one is pages and the other is lines, and no arithmetic a reader can perform relates them.

**A phrase contradicting its own messages.** Line 76 builds `${unjudged.length} key(s) nothing states a type for`. The messages beneath it say the type is stated: `` `description`: `json` is a type this states no rule for `` — 1,636 of those — and `` `keep-contract`: it is an attachment on `persona`, so its value stands beside the page in a `.attachment.txt` file and this reads frontmatter ``. Thirty-six distinct keys over 4,825 instances, and the largest families are one missing rule for the `json` type rather than thousands of undeclared keys. On the summary's wording this reads as thousands of unconstrained values; on the messages' wording it reads as one rule to write. This one is still live, and the count stands at 4,822.

A check whose output cannot be read correctly by a careful reader is a defect in the check rather than in the reader. Both readers here were careful, and an hour of work was dispatched against a number none of the three wordings holds.

Not measured: whether other checks share these shapes. `first()` is local to this file, but the pages-against-lines split and the summary-against-messages split are patterns rather than lines of code, and nothing was surveyed for them.
