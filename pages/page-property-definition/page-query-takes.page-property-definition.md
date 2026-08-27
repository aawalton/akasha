---
id: ec4ac96d-2f05-50bd-94eb-f6da5ff2ed5a
page-type-slug: page-property-definition
title: "Page query takes"
defined-on-slug: page-type/page-query
key: takes
type: map(type)
slug: page-query-takes
domain-parent-slug: domain/page-query-language
---

# Definition

- **Page query takes** — the arguments a page query is given when it is run, each named with the type its value must be.

# Design

An argument is text, a number, an instant, a calendar date, a boolean, or a list of text.

A list argument given as one string is split on commas.

An argument named here and used in no test is refused, and so is one given that is not named here.
