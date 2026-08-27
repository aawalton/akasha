---
id: 2e344158-1f7f-56b5-a49b-3eca4cccc7cb
page-type-slug: page-type
title: "Persona cover image"
extends-slug: page
files: akasha:**/*.persona-cover-image.md
named-for: "{persona-slug}-l{relationship-level}"
body-shape-slug: empty
slug: persona-cover-image
domain-parent-slug: page-type/persona
---

# Definition

- **Persona cover image** — the picture standing for a persona at one relationship level.

# Design

A persona has at most one cover image at each relationship level.

The one Alan sees is the highest at or below the level he stands at with her.

The object store holds the picture under the page's own id.

# Intent

Nothing but a cover image decides where a persona's cover points.

A cover image states its relationship level as a number.
