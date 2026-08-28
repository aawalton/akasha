---
page-type-slug: domain
title: "Akasha page edge"
slug: akasha-page-edge
domain-parent-slug: domain/akasha-page
---

# Definition

- **Akasha page edge** — a reference from one page to another.

# Design

An edge is an import where the target is needed to derive this page's type, and a slug everywhere else.

Every import edge is a slug property as well.

A slug edge is checked for its shape and never for what it names.

An edge imports only a type, and is gone before the page runs.
