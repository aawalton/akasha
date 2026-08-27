---
id: d35e0fbc-8f08-5acf-befa-ddaa53351592
page-type-slug: domain
title: "Category rule counterpart"
slug: category-rule-counterpart
domain-parent-slug: rules-engine-rule-set/category-rule
---

# Definition

- **Category rule counterpart** — the transaction on the other side of a movement between two accounts.

# Design

A counterpart is the exactly opposite amount within a window of days, and only that window is a rule's to set.

A counterpart is claimable once: where another transaction the same rule matches would also claim it, neither is settled.
