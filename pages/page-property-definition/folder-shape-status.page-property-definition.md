---
id: f7ae440a-09ba-40e6-a9b8-0416b9f5ce1f
page-type-slug: page-property-definition
title: "Folder shape status"
defined-on-slug: page-type/folder-shape
key: status
type: select(lower-kebab-case)
values:
  - hypothesis
  - coded
  - enforced
computed: true
slug: folder-shape-status
domain-parent-slug: page-type/folder-shape
---

# Definition

- **Folder shape status** — how far a shape has got toward being enforced.

# Design

A shape's status is read from the check it names, never written on the shape.
