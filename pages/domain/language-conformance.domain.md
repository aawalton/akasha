---
id: 01a04499-c2ef-7000-b796-359c321ac650
page-type-slug: domain
title: "Language conformance"
slug: language-conformance
domain-parent-slug: domain/language-design
---

# Definition

- **Language conformance** — how an implementation is held to what the language means.

# Principles

## Meaning Outside Code

**Write what a program means somewhere other than the code that runs it.**

Where the implementation is the only statement of a language, every bug it has is the specification.

Write the meaning before the evaluator.

Never settle a question by reading the code.

## Held To The Words

**Hold every implementation to the written meaning, never to another implementation.**

Implementations checked against each other agree on their shared mistakes and call it agreement.

Check each implementation against the words alone.

Never make one implementation the reference.
