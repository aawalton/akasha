---
id: c4c3ad6d-137a-5647-b3e6-7731ce739835
page-type-slug: domain
title: "Code comment"
slug: code-comment
domain-parent-slug: domain/code-quality
required-reading-slugs:
  - list/code-comment-forms
  - domain/generated-file
---

# Definition

- **Code comment** — text inside a source file that the language does not execute.

# Design

A generated file is outside this domain.

A file under a `__fixtures__` directory is outside this domain.

# Rules

## No Code Comments

**Write a code comment only in one of the code comment forms; everything else goes to a domain.**

Opus 5 obeys a comment as readily as a domain, so a drifted one competes with what stands.

Land what the comment said before you delete it.

Pick a domain whose code-path reaches this file.
