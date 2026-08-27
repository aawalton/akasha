---
id: 969f5565-3cb0-52d9-8566-9b12f34be577
page-type-slug: domain
title: "Ops zimage"
slug: ops-zimage
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/generation
---

# Definition

- **Ops zimage** — the command that renders one image on the workstation's container, from any checkpoint it serves.

# Design

The name is one served checkpoint's; the command reaches every model the container serves, Z-Image or not.

A served image generation runs through `ops inference generate`, never this command.
