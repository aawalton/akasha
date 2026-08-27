---
id: ddbc8519-5b9e-5a8c-8604-0e414b986cdc
page-type-slug: finding
title: "Code rules claim every statement before an agent can show Alan one that reports a problem"
domain-slug: domain/alan-email
---

# Claim

The Ask The Account aid "Show him a statement that reports a problem" cannot fire for the accounts it is about. The code rules `account-statements`, `vanguard-statements` and `royalty-statements` claim any subject carrying "statement" from seven senders, and the matching agent rules (`citi-other`, `synchrony-statement-other` and their siblings) all exclude the word. A statement reporting a problem from those accounts is archived by code before an agent reads it.

# Evidence

Read off the `review-instructions` reading of `domains/alan-email.md` finished 2026-08-21, read line by line, bottom to top. That reading ran `ops instructions run-checks email-rules-cover email-rules-disjoint` — both pass, 107 rules decided over 21230 distinguishable messages — so the rule set is a partition and a class this document names is reachable only where no code rule claims it first. It read all 107 rules under `email/alan`.

Not measured here: I did not open the three code rules or the agent rules, and I did not check whether a statement reporting a problem has in fact arrived from any of the seven senders. Whether the repair is to narrow the code rules or to say the aid covers unmatched senders only is not settled here.
