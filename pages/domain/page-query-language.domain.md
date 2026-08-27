---
id: 58dff5a0-4aab-5bd0-b63a-ed2e73e9faa3
page-type-slug: domain
title: "Page query language"
slug: page-query-language
domain-parent-slug: page-type/page-query
required-reading-slugs:
  - list/page-query-times
---

# Definition

- **Page query language** — what a page query may say.

# Design

A page query is written in page properties alone.

A page query states values, never expressions.

A page query joins its tests with and, and has no or.

A page query tests one page at a time.

A page query compares a value by the type its property declares.

A page query either counts by properties or reduces one, never both.

A page query names the arguments it takes, and writes `$` and one's name where a value would stand.

# Intent

A page query can name the wake day.
