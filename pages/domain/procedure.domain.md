---
id: 73a0bc80-4fe2-50a6-8a2f-a67711058f79
page-type-slug: domain
title: "Procedure"
slug: procedure
domain-parent-slug: domain/database
---

# Definition

- **Procedure** — code the database runs.

# Design

A procedure is written in TypeScript and compiled, never written as SQL.

What the compiler produces is compared byte for byte against what a migration would apply.

A procedure takes `ctx` and `args`, a helper takes `args`, and an export under `proc/src/` taking anything else is a reference implementation with no emit.

An export under `proc/src/` returning `SqlTemplate` is a fragment another procedure composes, not one itself.

A source not identifiable as a reference counts as a procedure.
