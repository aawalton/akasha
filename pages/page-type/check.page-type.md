---
id: 50bd1069-098f-5eeb-be75-5b1108edd857
page-type-slug: page-type
title: "Check"
extends-slug: page
files: akasha:**/*.check.md
body-shape-slug: domain
code-loaded-by: akasha:checks-system/checks.ts
slug: check
domain-parent-slug: domain/checks-system
sequence-slugs:
  - domain/check-outcome
---

# Definition

- **Check** — code run to check a domain invariant.

# Design

A check is handed what it says it needs and nothing more.

A check judges the code, never its author.

Nothing holds a body a program decided to a standard written for an author.

A check's answer is kept against a file only where that file's body was all it was handed.

A check that judges only what a change touches goes on before main is clean.

# Condition

No domain invariant has more than one check.

# Intent

A check is a module, not a command.

A check is given the root those files are under.

A check looks for no files.

A check takes and gives absolute paths.

Every file means every file in akasha.

# Rules

## Alan Approves

**Add a check to akasha only where Alan has approved that check.**

A check binds every writer on every change, and a wrong one costs more than what it guards.

Approving the initiative is not approving a check.

A check replacing an old one still needs approval.
