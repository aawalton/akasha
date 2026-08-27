---
id: 42290bb4-a421-5fe5-bb78-413972edc13a
page-type-slug: finding
title: "Rule set page type still stands"
domain-slug: domain/email
---

# Claim

The `email-rule-set` page type still stands in the database with no pages under it and no code reading it.

# Evidence

#18797 removed every reader of an email rule from the code repository, deployed at `61e30154080e`. Checked by amy-lead on 2026-08-12 while verifying that hand-back: `ops page list --type email-rule-set` returns no rows, and a search of the code repository for `email-rule-set`, `readRules` and `writeRules` returns nothing but an unrelated ast-grep helper.

What remains is the page-type row itself, id `019f0b7f-3d04-767c-a3a2-3ebf70419d58`, an empty shell of a concept nothing instantiates. It holds no copy of Alan's rules, so it breached no criterion of that project and did not hold up its close.
