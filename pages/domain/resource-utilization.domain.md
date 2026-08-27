---
id: 84a0bfed-eaf2-5f7c-8d2c-130c1a034eab
page-type-slug: domain
title: "Resource utilization"
slug: resource-utilization
domain-parent-slug: domain/throughput
---

# Definition

- **Resource utilization** — how much of each resource the system runs on is in use rather than idle.

# Design

A resource may itself be an assembly line of other resources.

An assembly line's reading is the highest of its parts' readings.

A resource is fully utilized once work accumulates in front of it, whatever busy time it reports.

Work accumulating while busy time reads under full means the bottleneck is not the one being measured.
