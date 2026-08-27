---
id: abf190a5-e33a-5856-97bd-40499aef7b99
page-type-slug: finding
title: "Notice states inbox unchecked"
domain-slug: domain/email
---

# Claim

The notice handing a message to a seat for judgment states the mail is still in the inbox without having checked, and the message it named on 2026-08-15 was in the spam folder rather than the inbox.

# Evidence

On 2026-08-15 a notice reached Alan's handler reading "1 piece(s) of Alan's mail are waiting on you" and "the mail is still in the inbox". It named `advtechindcoltd <chengdu@spostq.com>`, subject "Alan — Your LATITUDE QC lab materials, ready & NSF-aligned", claimed by the `everything-else` agent rule.

`ops email messages list --query "in:inbox"` returned one message and it was not this one. `ops email messages list --query "in:spam"` returned it, id `1a005fadf7400910`. Queries for `from:chengdu@spostq.com`, `subject:LATITUDE`, `spostq`, `advtechindcoltd` and `NSF-aligned` all returned nothing, Gmail's default search scope excluding spam, so the message read as absent from the account entirely until `in:spam` and `in:anywhere` found it.

The same address had already sent one other message now sitting in spam: "Re: Functional creamer base for beverage formulators at LATITUDE", id `1a000f185b048831`, dated 2026-08-14. Both are cold sales outreach that took "LATITUDE" for the name of a laboratory.

`ops email messages get --message 1a005fadf7400910` returns a payload carrying the keys date, from, id, snippet, subject, threadId and to. It carries no `labelIds` and no body, so a seat holding a message id cannot read that message's folder from the payload and has to search for the id to find out where it sits.
