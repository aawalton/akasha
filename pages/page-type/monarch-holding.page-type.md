---
id: 01a01d14-6614-7002-abf6-f6173d807f04
page-type-slug: page-type
title: "Monarch holding"
extends-slug: page
files: akasha:**/*.monarch-holding.md
body-shape-slug: empty
slug: monarch-holding
plural-slug: monarch-holdings
domain-parent-slug: domain/monarch
required-reading-slugs:
  - repo/memory-repo
named-for: "{slug}"
---

# Definition

- **Monarch holding** — how much of one investment an account holds.

# Design

A holding stands under exactly one account, and Monarch reports it only for an account that says it has holdings.

A holding reports no cost basis where the account never told Monarch what was paid.

A holding is three figures the daily sync rewrites and no instruction names, so it stands in memory.
