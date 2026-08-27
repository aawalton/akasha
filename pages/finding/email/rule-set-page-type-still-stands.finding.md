---
id: 42290bb4-a421-5fe5-bb78-413972edc13a
slug: rule-set-page-type-still-stands
page-type-slug: finding
title: "Rule set page type still stands"
domain-slug: domain/email
---

# Claim

The `email-rule-set` page type still stands in the database with no pages under it and no code reading it.

# Evidence

#18797 removed every reader of an email rule from the code repository, deployed at `61e30154080e`. Checked by amy-lead on 2026-08-12 while verifying that hand-back: `ops page list --type email-rule-set` returns no rows, and a search of the code repository for `email-rule-set`, `readRules` and `writeRules` returns nothing but an unrelated ast-grep helper.

What remains is the page-type row itself, id `019f0b7f-3d04-767c-a3a2-3ebf70419d58`, an empty shell of a concept nothing instantiates. It holds no copy of Alan's rules, so it breached no criterion of that project and did not hold up its close.

WHAT THE FILE STORE SHOWS NOW, and why that does not settle it. Re-measured 2026-08-27: no `email-rule-set` page type file exists, the id above appears nowhere in the tree, and the concept has been succeeded by `pages/page-type/rules-engine-rule-set.page-type.md`, which `tools/lib/email-rule-set.ts` reaches under the rule-set name `email-rule`. That is the whole of what a reading of this repository can reach.

The claim is about a DATABASE row, and no reader of files can see one. What would settle it is a query for that page-type id against the live database by whoever can run one — a row still standing there is the claim holding, and its absence is the claim spent. This finding is held rather than removed for exactly that reason: a verdict resting on evidence the reader could not reach is not a verdict.
