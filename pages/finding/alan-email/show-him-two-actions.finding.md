---
id: c22c7c90-6d2e-5ca2-9899-7e60dd0460b9
slug: show-him-two-actions
page-type-slug: finding
title: "Show him spans two declared actions and the document distinguishes neither"
domain-slug: domain/alan-email
---

# Claim

"Show him" stands four times in `domains/alan-email.md` (lines 26, 60, 70, 110) and spans two declared actions — `email-action-skip`, which leaves a message in his inbox, and `email-action-notify`, which messages him. Nothing in the document distinguishes them, and the agent rules' "send Alan what needs him" does not either. `notify` is stated as an action zero times across the 107 rules under `email/alan`, so in practice showing him has always meant `skip`.

# Evidence

Read off the `review-instructions` reading of `domains/alan-email.md` finished 2026-08-21, read line by line, bottom to top. That reading read all 107 rule files under `email/alan` and counted the actions across them: archive 51, forward 6, unsubscribe 5, skip 2, notify 0. It reached this as a whole-document reading, no single line being wrong on its own.

Not measured here: I did not run the count myself, and I did not look outside `email/alan` for a rule stating `notify`. Whether the repair is to say which action the document means at each of the four places, or whether `notify` has no population in Alan's mail at all, is not settled here.
