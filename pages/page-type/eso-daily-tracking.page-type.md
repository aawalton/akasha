---
id: aade7c2e-69cc-573e-ba0d-73229b432652
page-type-slug: page-type
title: "ESO daily tracking"
extends-slug: page
files: memory:**/*.eso-daily-tracking.md
body-shape-slug: empty
slug: eso-daily-tracking
domain-parent-slug: domain/alan-harness-tracking-store-page
required-reading-slugs:
  - repo/memory-repo
  - domain/eso-day
---

# Definition

- **ESO daily tracking** — what was measured about one of Alan's ESO days.

# Design

One file holds one ESO day, and everything measured against that fixed boundary stands there.

The six-in-the-morning reset settles which day a measurement falls in, so nothing later moves it.

A measurement counting on the wake day stands on the wake page instead, however fixed its own instant.
