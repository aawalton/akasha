---
id: 5dd363c6-5af1-5b63-afe7-7b485758a407
slug: extends-chain-stops-short-of-page
page-type-slug: finding
title: "Four page types have an extends chain that never reaches page, exempting 213 pages from every universal property"
domain-slug: domain/pages-system
---

# Claim

No `category-rule.page-type.md` and no `email-rule.page-type.md` stand anywhere in the repository, so the four types naming them in `extends-slug` — `category-rule-agent`, `category-rule-code`, `email-rule-agent`, `email-rule-code` — have a chain that never reaches `page`. None of the universal properties defined on `page` are declared for them, so their 213 live pages are exempt from every one, including the `id` that `page-id.page-property-definition.md` defines on `page`. All 213 state one, backfilled not held.

# Evidence

Run on 2026-08-20 against the working tree, not read.

Walking `extends-slug` across all 368 files under `pages/page-type/*.page-type.md` and asking which chains reach `page`: 364 reach it, 4 do not — `category-rule-agent`, `category-rule-code`, `email-rule-agent`, `email-rule-code`. Each names `extends-slug: category-rule` or `extends-slug: email-rule`, and `ls pages/page-type/` has no `category-rule.page-type.md` and no `email-rule.page-type.md`.

The population, counted through the page query service by asking each type for its rows: `category-rule-code` 104, `email-rule-agent` 54, `email-rule-code` 53. `category-rule-agent` has 1 page under `pages/category-rule-agent/*.category-rule-agent.md`. That is 212 pages across the four, and all 212 stated no `id:`. Re-counted from the files 2026-08-28: 213, every one stating an `id:`, backfilled at `f72762e40d`.

That `required:` binds through the `extends-slug` chain was measured rather than inferred. A fixture copy of the instructions repo was built at a scratch root with `required: true` added to `pages/page-property-definition/page-id.page-property-definition.md`, and `runFileGates` run against real page bodies through both roots. Against the real root, `domains/file-kinds/typescript.md` draws no id refusal. Against the fixture, the same file draws `[page-holds-properties] fail — \`id\` is required on \`page\` and this states none`, and `domains/ios-apps/atlas-ios.md`, which states an id, passes. `file-kind` extends `domain` extends `page`; the four types above have no such path.

Re-measured 2026-08-28 by astra. The walk above took `pages/page-type/*.page-type.md`, which cannot see the eleven page types filed beside their own domains under `graph/` and `readouts/`. Walking `extends-slug` over all 391 tracked `*.page-type.md` instead, every one parsed and no slug stated twice, still gives exactly four chains that stop short, and the same four. Control on the widened population: `graph-node`, filed at `graph/node/graph-node.page-type.md`, is in the walked map and its chain reaches `page`.
