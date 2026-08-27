---
id: 01a044ed-0d79-7000-81ff-92265bb277db
page-type-slug: domain
title: "Formula absent value"
slug: formula-absent-value
domain-parent-slug: domain/formula-language
---

# Definition

- **Formula absent value** — what a formula does where a value is not there.

# Intent

An operator that reaches an absent value answers absent.

`==` and `!=` answer a boolean, absent being equal only to absent.

A case row matches only where its test answers true.

`??` answers its left side, or its right where its left is absent.

Dividing by zero answers absent.

A text literal answers absent where any reference in it is absent.
