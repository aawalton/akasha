---
id: 8ea312db-9139-59bd-9c44-d67c3f1b3e30
page-type-slug: mp-readout-group
title: "Readout group categorization"
slug: readout-group-categorization
domain-parent-slug: mp-readouts
---

# Definition

- **Readout group categorization** — how much of the transaction record is still unreviewed.

# Design

The backlog counted is a year's; the intake it is measured against is a month's.

The feed also sends the year's total, which no tile draws.

The tap opens Monarch filtered only where Monarch was not already running.
