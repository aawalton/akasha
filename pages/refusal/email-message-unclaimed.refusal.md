---
id: f76ddd44-f345-54a6-9afe-529b8f211e55
page-type-slug: refusal
title: "Email message unclaimed"
holes:
  - folder
  - message
---

# Refusal

No rule under {folder} matches this message: {message}.

`pages/domain/rules-engine.domain.md` holds that everything a set of rules judges matches exactly one of them. Mail no rule claims is left where it arrived: the worker files it nowhere and hands it to no agent. The count it leaves and the line it logs both come after the mail sat undecided, and neither names a rule that should have claimed it.

The message is spelled out of the values the rules themselves compare against, so it is a message rather than an example: `someone@unnamed.` and ` ~ ` stand where nothing any rule names is to hold.

Widen a rule until it claims this, or write the rule that names it.
