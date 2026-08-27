---
id: 8f30b3a6-c783-5262-ae73-a126042c424c
slug: agent-is-trustworthy-on-four-payee-categories
page-type-slug: finding
title: "Agent is trustworthy on four payee categories"
domain-slug: domain/semantic-categorization
---

# Claim

An agent can be trusted to categorize four payee-determined categories and nothing else, which is about 2.9% of the transactions no rule reaches.

# Evidence

Where the agent answers `Paychecks`, `Utilities`, `Mortgage` or `Fast Offering` at high confidence, it was right 50 times out of 50 on the 600 held-out transactions, and 18 out of 18 on the 160 development ones — 68 of 68 across two disjoint samples.

Reweighted to the real mixture of the 6409 scorable rows, that gate fires on about 2.9%, or roughly 189 transactions. Jenny still settles the other 6220.

No other answer reaches it. At high confidence the agent's precision was `Transfer` 84.0% (21/25), `Shopping` 87.5% (14/16), `Medical` 92.3% (12/13), `Phone` 88.9% (8/9), `House` 20.0% (1/5) and `Auto` 0% (0/15).

Nine wrong in a hundred sounds close. It is not close: `Doubt Goes To A Person` holds that a wrong category is never looked at again while a needless question is answered once, so 12% wrong on `Medical` buys silent corruption to save Jenny thirteen questions.

The four that hold share a shape. Each is a recurring bill from a payee that does one thing, where the merchant name settles the category with nothing left over for anyone to have meant. That is also the shape a written rule matches exactly, so the honest reading is that a rule should take them and the agent is not needed for them either.
