---
id: 0506bcfd-5840-55e4-a426-699437d86a13
page-type-slug: domain
title: "Run cost"
slug: run-cost
domain-parent-slug: domain/run
---

# Definition

- **Run cost** — what one run takes.

# Design

A run has three costs.

A first run against an empty cache is measured one band looser than the band it holds.

# Intent

A run's cost is held against a budget rather than a band.
