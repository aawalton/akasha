---
id: 91b28b3a-9cdf-5d7e-b155-7bad14099f19
page-type-slug: package
title: "Temper shared capture core"
slug: temper-shared-capture-core
repo: akasha
domain-parent-slug: domain/temper-addons-tooling
---

# Definition

- **Temper shared capture core** — in-game code that opens an addon's saved-variables table and spreads long work over many frames.

# Design

When a capture fires is the module's own; only the binding and the declaration stand here.

This package imports the in-game runtime, so nothing can compile against it as a project reference.
