---
id: 5e29f4ee-c3d4-5935-aaaa-fcfda23a3dd3
slug: review-readings-diverged
page-type-slug: finding
title: "Review readings diverged"
domain-slug: page-type/domain
---

# Claim

Two dispatched reviews read the same pair of rules opposite ways on one day. The reviewer of `domains/arousal.md` landed three commits touching its Rules and Definition (61d16eb6, 5baf9efa, 4e088704) and its report never mentions Every Changed Line. The reviewer of `domains/code-check.md` read the same rule as binding, landed only a Tasks-entry trim, and withheld a Definition repair it had already justified. Both were dispatched by one pass, under one release state: nothing released.

# Evidence

Observed 2026-08-06 across a review-documents pass over the 59 documents `stale-reviews.ts` names. Both reviewers were spawned on the same task, `review-instructions`, with identical prompts naming only their subject. Neither was told anything about what to decide.

I verified the arousal commits stand in the log and touch Rules and the Definition bullet. The code-check reviewer stated its reasoning to me in terms: "I took the strict reading: the rule is explicit, addresses this exact act, and was not released. Breaching it wrongly costs a Definition every reader below inherits unseen; obeying it wrongly costs one turn."

This is the practical half of `pages/finding/domain/changed-line-review-exception.finding.md`, which records that the two rules disagree in text. That the disagreement is not merely textual — that it produces different acts on the corpus from one dispatch — is what is measured here.

Not measured: whether the arousal reviewer considered the rule and rejected it, or never reached it; its report is silent either way. Not measured: how the remaining 55 subjects in this pass will split. I did not settle the fork, and I could not escalate it — `ops ask-alan` refuses a seat that resolves to no persona, and this seat has no principal.
