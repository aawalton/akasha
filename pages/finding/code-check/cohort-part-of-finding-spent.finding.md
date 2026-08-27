---
id: 9910f1cf-e8a0-5ec7-9f92-4213acf45517
page-type-slug: finding
title: "Cohort part of finding spent"
domain-slug: domain/global
---

# Claim

One part of a standing finding has gone stale while the rest holds. `pages/finding/code-check/review-check-ambiguous-stages.finding.md:19` records that `cohort` is used once on `domains/tasks/code-harness/review-check.md`, appears nowhere else in the corpus, and may have been rewritten wrongly. The word is no longer on that document. The finding's three main claims — the two readings of "acquisition", "fails nothing else" and "states none" — are unaffected and still hold.

# Evidence

Surfaced by the review-instructions seat on `domains/tasks/code-harness/review-check.md`, which read the three standing findings on its subject, confirmed all three still hold, and correctly re-filed none of them. It noted this one part as no longer holding.

I verified both ends: grepping `cohort` across `domains/tasks/code-harness/review-check.md` returns nothing, and line 19 of the finding names it as quoted.

Filed rather than acted on. `domains/finding.md` says a finding is deleted when its claim stops being true, and part of one going stale is not a case it covers — deleting would take three live claims with it, and amending another seat's finding is not an archivist's call. Whoever judges that finding should know line 19 is spent.

Not measured: when or in which commit the word left the document.
