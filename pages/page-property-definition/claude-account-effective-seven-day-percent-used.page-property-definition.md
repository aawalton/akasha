---
id: c1523ba1-bb77-5440-8798-857dbd1eb77d
page-type-slug: page-property-definition
title: "Claude account effective seven day percent used"
defined-on-slug: page-type/claude-account
key: effective-seven-day-percent-used
type: number
expression: 'case({subscription-disabled-reason} != absent -> 100, otherwise -> {seven-day-percent-used})'
slug: claude-account-effective-seven-day-percent-used
domain-parent-slug: page-type/claude-account
---

# Definition

- **Claude account effective seven day percent used** — how much of the account's seven-day allowance a call made now would find spent.
