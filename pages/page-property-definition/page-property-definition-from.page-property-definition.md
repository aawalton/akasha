---
id: 01a0117c-5a47-7000-a0b3-3e87c1147933
page-type-slug: page-property-definition
title: "Page property definition from"
defined-on-slug: page-type/page-property-definition
key: from
type: list(text)
slug: page-property-definition-from
domain-parent-slug: page-type/page-property-definition
---

# Definition

- **Page property definition from** — the paths a derived value is read along, in the order they are tried.

# Design

A path is property keys joined by dots, and each key but the last is a relation walked to the page its `target-slug` names.

The first path reaching a value settles it, and the rest are not read.
