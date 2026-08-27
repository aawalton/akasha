---
id: 2afacee3-4c0e-5aea-ad4e-94d5c3cae667
slug: email-rules-overlap
page-type-slug: refusal
title: "Email rules overlap"
holes:
  - rule
  - other
  - count
  - message
---

# Refusal

{rule} and {other} both match {count} of the messages this rule set can tell apart. One of them: {message}.

`pages/domain/rules-engine.domain.md` holds that everything a set of rules judges matches exactly one of them, and nothing ranks two matches — no order, no score, no specificity. So the mail these two share is mail the rule set does not decide, while each rule reads as settled and each author goes on believing theirs is the one that acts on it.

The message is spelled out of the values the rules themselves compare against, so it is a message rather than an example: `someone@unnamed.` and ` ~ ` stand where nothing any rule names is to hold. It is one of the {count}, so narrowing a rule until that one message stops being shared leaves the rest of the overlap standing.

Narrow one of the two so their matches no longer meet, or make the pair three rules — what only the first claims, what only the second claims, and what both do.
