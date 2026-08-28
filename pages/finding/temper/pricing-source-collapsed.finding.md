---
id: 6bc9c8ef-86bb-5ef3-84e4-252c80f45e5e
slug: pricing-source-collapsed
page-type-slug: finding
title: "Pricing source collapsed"
domain-slug: domain/temper
---

# Claim

Temper's `pricing-source.ts:72` maps `priceSource === undefined` (meaning unknown — the scan predates the addon's price-source stamp) to kind `'none'`, which renders identically to a healthy TTC scan, so an inventory whose price source is unknown is presented the same as one known to be fine; this is a legacy-path three-value collapse rather than a new-user risk.

# Evidence

Project #16039 (domain `temper`, parent #15869 "Milestone 1 — Temper's path to its first external user (readiness + data-floor)"), owner ember, tag `author:ember`, created 2026-07-25.

The project's title carries its full observation, since its notes body was never filled in: Temper — `pricing-source.ts:72` maps `priceSource===undefined` (UNKNOWN, scan predates the addon stamp) to kind `'none'`, which renders exactly like a healthy TTC scan: an inventory whose price source we do not know is presented identically to one we know is fine. A three-value collapse; explicitly noted as a legacy path, not a new-user risk.

The project record carried no notes beyond standard boilerplate; there is no further detail to preserve.
