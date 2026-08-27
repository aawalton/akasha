---
id: 6ab02de1-dfb7-5d64-8794-eea85c6f1c81
page-type-slug: finding
title: "Delegation overlaps product text"
domain-slug: page-type/role
---

# Claim

The Delegation rule on `domains/role.md` overlaps text the harness already supplies. The `Agent` tool description in every seat's system prompt reads "Once you've delegated a search, don't also run it yourself — wait for the result." Single Authority is not breached, that being Anthropic's product text rather than a corpus document, but Cut The Obvious is weaker against this rule than it looks — the model is told the same thing twice at every boot.

# Evidence

Raised by a review-instructions seat on `domains/role.md`, which kept the rule for two stated reasons: the corpus version is wider and carries a warrant, and the product sentence can vanish in a release with nothing in this repo noticing.

I verified the product text firsthand — it appears in this seat's own `Agent` tool description, worded exactly as quoted.

The reviewer put the question of whether to keep paying for the overlap to its principal rather than deciding. Not measured: how much of the corpus rule the product text actually covers, or whether any other corpus rule overlaps harness-supplied text the same way.
