---
id: d1d38484-bee1-5a96-8e1d-5ce5b4e91755
page-type-slug: finding
title: "Eslint directives unadmitted in code"
domain-slug: domain/code-comment
---

# Claim

Twenty-three tracked files in the code repository carry an `eslint-disable` comment, and `domains/lists/code-comment-forms.md` no longer admits that form. Nothing is refused today: the `comment-forms` gate reports itself not-applicable outside the instructions repository. When the code repository is swept, those twenty-three files hold text no form admits.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/lists/code-comment-forms.md`, which raised it after cutting the form at `4b9c2735c`.

I counted the files myself: `git grep -l eslint-disable` in the code repository returns 23, and the same count over `*.ts`, `*.tsx` and `*.js` returns 23, so every occurrence sits in a source file. The gate says in its own words that the instructions tree is "the tree swept of what stands outside them".

The reading judged the outcome correct rather than a loss — an eslint directive no linter reads is inert text, and inert text is what `domains/code-comment.md` **No Code Comments** exists to remove.

Not measured: nothing here says whether any of the 23 was ever load-bearing, whether a sweep of the code repository is planned, or what removing them would cost to review.
