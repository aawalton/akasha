---
id: 44388a5f-354c-5c95-ac16-b62589474c3a
page-type-slug: domain
title: "Command"
slug: command
domain-parent-slug: domain/coding-definitions
settled: true
---

# Definition

- **Command** — code someone can run by name.

# Design

A command cannot see a substitution the shell made in its arguments, only the result.

# Principles

## Repeating Problem

**Write a command only where the problem repeats, and solve it in a repeatable way.**

Writing the command costs more than doing the job by hand; everything it saves is in later runs.

A job anyone has done by hand twice repeats.

A run that needs you to decide is not repeatable.
