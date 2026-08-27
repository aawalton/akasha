---
id: 7dc23c0e-d1cd-55ba-846c-d8f90b19689e
page-type-slug: domain
title: "Browser"
slug: browser
domain-parent-slug: domain/coding-definitions
settled: true
---

# Definition

- **Browser** — code that runs in the browser.

# Design

No glob names this area; a module is browser code by what it does, not by where it sits.

A page's file is reached from a server, never from a browser.

# Rules

## Directive Is Not The Boundary

**Reach pages from browser code through `@shared/pages-ui`, with or without a `"use client"` line.**

That line is the gate's whole test, so a module without it reaches pages from the browser unchecked.

Change the page import, never add `"use client"`.

Do not touch code that never runs in the browser.
