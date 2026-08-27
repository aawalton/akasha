---
id: f2c21e6c-8b3d-440c-bfc9-fc7a08deceb3
page-type-slug: page-property-definition
title: "Seat proxy process"
defined-on-slug: page-type/seat
key: proxy-process
type: process
uncommitted: true
slug: seat-proxy-process
domain-parent-slug: domain/seat-observation
settled: true
---

# Definition

- **Seat proxy process** — the process serving a seat's model calls.

# Design

A seat's proxy process outlives the supervisor that spawned it, and is adopted by the next one.

A seat holding no proxy process has none running, and one found running without it is stopped.
