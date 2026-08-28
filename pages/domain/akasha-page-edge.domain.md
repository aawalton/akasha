---
id: 6c3c09b8-72c6-51aa-bbd6-1ea751a35bc3
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

An edge imports only a type, and is gone before the page runs.
