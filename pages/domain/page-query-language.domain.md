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

A page query joins its tests with and, and has no or.

A page query tests one page at a time.

A page query compares a value by the type its property declares.

A page query either counts by properties or reduces one, never both.

A page query names the arguments it takes, and writes `$` and one's name where a value would stand.

A page query names one page type, and where it expands means that one with every page type beneath it.

A ring among page types is refused when a page query expanding one is checked.

# Intent

A page query can name the wake day.
