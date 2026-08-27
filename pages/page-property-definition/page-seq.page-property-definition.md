---
id: 01a00a45-46fc-7000-8477-89b45625d6b6
page-type-slug: page-property-definition
title: "Page seq"
defined-on-slug: page-type/page
key: seq
type: number
slug: page-seq
domain-parent-slug: domain/page-property-universal
---

# Definition

- **Page seq** — the number a page is minted with.

# Design

A seq is unique among the pages of its page type.

A seq is never reissued, including after the page holding it is gone.

A seq carries no order anyone chose.

A page with no seq sorts after every page that has one.
