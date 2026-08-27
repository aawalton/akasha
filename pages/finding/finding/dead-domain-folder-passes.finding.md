---
id: d84a7855-ff13-594a-81d5-7551d771000c
slug: dead-domain-folder-passes
page-type-slug: finding
title: "Dead domain folder passes"
domain-slug: page-type/finding
---

# Claim

`tools/audits/findings-sorted.ts` holds a finding's `domain-slug:` key against its folder and neither of them against the corpus, so a finding whose key and folder agree on a domain that no longer exists passes. Renaming a domain therefore orphans every finding filed under it, silently, and the check that exists to keep the two in step reports nothing.

# Evidence

Re-read 2026-08-27. `tools/audits/findings-sorted.ts` reads `domain-slug` at line 38, compares it to the folder segment at line 41, and looks at nothing else: `rg -n 'declaredDomains|undeclaredRefusal' tools/audits/findings-sorted.ts` returns nothing. Run over the tree as it stands, the check weighs 3294 findings under `pages/finding/` across 432 domain folders and never asks whether any of those 432 names a domain a page still declares.

The capability is built and unused. `undeclaredRefusal` in `tools/lib/finding.ts:76` resolves a slug against `declaredDomains`, and is called from `ops finding rehome` (`tools/commands/finding/rehome.ts:94`) and `ops finding create` (`tools/commands/finding/create.ts:108`), both of which would refuse a dead slug. `tools/audits/findings-sorted.ts` imports neither.

The original instance: a domain was renamed, the rename repointed every reference, and the findings filed under the old folder were left naming a domain that no longer existed with nothing reporting them. Project documents carrying the same dead key were repointed by hand in the same pass, and nothing reported those either.
