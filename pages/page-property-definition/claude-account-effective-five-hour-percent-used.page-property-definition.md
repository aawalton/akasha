---
id: c8cdddd1-55ad-5c66-9324-6304014ec2d0
page-type-slug: page-property-definition
title: "Claude account effective five hour percent used"
defined-on-slug: page-type/claude-account
key: effective-five-hour-percent-used
type: number
expression: prop(subscription-disabled-reason) && 100 || prop(seven-day-percent-used) >= 100 && 100 || prop(five-hour-percent-used)
slug: claude-account-effective-five-hour-percent-used
domain-parent-slug: page-type/claude-account
---

# Definition

- **Claude account effective five hour percent used** — how much of the account's five-hour allowance a call made now would find spent.
