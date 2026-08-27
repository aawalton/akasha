---
id: 5ed00840-fd57-564b-9e5d-6bcc5a342a36
page-type-slug: page-property-definition
title: "Page query test contains"
defined-on-slug: page-property-type/page-query-test
key: contains
type: text | list(text)
slug: page-query-test-contains
domain-parent-slug: domain/page-query-language
---

# Definition

- **Page query test contains** — the text the property's value must hold somewhere inside it.

# Design

Contains reads the value as one text and matches in any position, ignoring case. Has reads the value as a list and matches a whole element of it, letter for letter.

Where several texts are stated, the value holds every one of them.

A page carrying no value at all is matched by neither.
