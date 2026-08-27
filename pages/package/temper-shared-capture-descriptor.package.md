---
id: a044c545-efb8-5fb0-9a49-9225241b2e95
page-type-slug: package
title: "Temper shared capture descriptor"
slug: temper-shared-capture-descriptor
repo: code
domain-parent-slug: domain/temper-addons-tooling
---

# Definition

- **Temper shared capture descriptor** — the shape naming a capture addon, the table it saves into, its version and its starting values.

# Design

A descriptor is bounded on any object payload, never on the optional load-time field.

A payload carrying none of the fields a bound names satisfies that bound nowhere.

An addon's manifest name cannot be worked out from the global its saved variables stand in, so both are carried here.

This package imports nothing that runs in the game, so every payload can compile against it.
