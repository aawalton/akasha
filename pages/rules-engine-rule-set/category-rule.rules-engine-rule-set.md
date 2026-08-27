---
page-type-slug: rules-engine-rule-set
title: "Category rule"
id: 01a0078a-e6b3-7000-8781-1fd3e1a69576
extends-slug: page
files: none
body-shape-slug: domain
applies-to-slug: monarch-transaction
path-pattern: '^pages/category-rule-(?<kind>agent|code)/(?<slug>[a-z0-9-]+)(?:\.category-rule-\k<kind>)?\.md$'
slug: category-rule
domain-parent-slug: page-type/monarch-category
required-reading-slugs:
  - domain/rules-engine
---

# Definition

- **Category rule** — a written rule deciding what a transaction counts as.

# Design

A rule decides a category by naming one, and naming none leaves a person to settle it.

A rule may require a counterpart, which is not one of its conditions.

A rule requiring a counterpart settles nothing where none pairs uniquely.

A rule gives the same answer every time it is run.

A rule's amounts accumulate as its price rises, rather than being replaced.

A category is named as Monarch titles it, and a merge or a rename in Monarch warns nobody.

# Principles

## The Failure Worth Having

**Prefer the clause that fails by matching nothing to the one that fails by matching wrongly.**

An unmatched row waits where somebody sees it; a wrong category becomes a total nobody checks.

Never add a tolerance or widen a date window.

Never tighten a clause until it catches nothing.

## The Rows It Will Catch

**Weigh a rule by the rows it will catch rather than the rows it has caught.**

What a rule is worth is entirely ahead of it, and the rows behind are the only ones you can count.

Ask Alan whether the charge will come again.

Write a subscription's rule on its first row.
