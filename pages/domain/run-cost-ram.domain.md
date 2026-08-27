---
id: 70834e69-8cc4-5396-9b49-3b4d7a5263fc
page-type-slug: domain
title: "Run cost RAM"
slug: run-cost-ram
domain-parent-slug: domain/run-cost
---

# Definition

- **Run cost RAM** — the most RAM a run holds at once.

# Design

A run's RAM is the largest sum reached by the runs inside it that are alive at the same moment.

A run past the RAM available is killed rather than slowed.
