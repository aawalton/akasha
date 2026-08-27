---
id: 86479edd-74af-5bb2-95f2-a743a4b2887d
page-type-slug: domain
title: "Design system"
slug: design-system
domain-parent-slug: repo/code-repo
required-reading-slugs:
  - domain/browser
persona-champion-slug: olwen
---

# Definition

- **Design system** — the reusable parts an interface is assembled from.

# Rules

## Layout Ownership

**Write what separates a component from its neighbours on the parent, never on the component.**

A component cannot see its neighbours, and a gap on the parent survives them coming and going.

Never add a prop that lets a caller space it.

Keep the space inside a component on it.
