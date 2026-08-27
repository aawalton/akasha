---
page-type-slug: page-type
title: "Page body shape"
id: 01a00062-0d8b-7000-8ea7-0b8a27d8b21d
extends-slug: page
files: instructions:**/*.page-body-shape.md
body-shape-slug: template
slug: page-body-shape
domain-parent-slug: page-property-definition/page-body
---

# Definition

- **Page body shape** — what a page body may hold.

# Design

A shape is a document of its own, and more than one page type can name the same one.

A shape chains to another shape, never to a page type.

A shape checks the raw body and never writes it.

A size bound counts every character inside what it bounds.

A shape's sections stand in the order it writes them, and the sections of a shape it chains to stand above its own.

# Intent

A shape says which text an absent written slot takes with it.
