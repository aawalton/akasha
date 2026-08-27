---
id: 01a04495-bb89-7000-96ca-f252f39ae110
page-type-slug: domain
title: "Language type system"
slug: language-type-system
domain-parent-slug: domain/language-design
---

# Definition

- **Language type system** — what a value is and what may be done with it.

# Principles

## Declared Not Guessed

**Take a value's type from what declared it, never from how it is written.**

Text that looks like a number is still text, and reading it as one loses what the writer meant.

Ask what declared a value, not what it looks like.

Never let a value's shape choose its type.
