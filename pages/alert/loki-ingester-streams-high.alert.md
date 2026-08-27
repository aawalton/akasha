---
id: 747c01d6-597d-53fc-b836-2fd532e6cde9
page-type-slug: alert
title: "Loki ingester streams high"
slug: loki-ingester-streams-high
domain-parent-slug: page-type/alert
domain: infrastructure
summary: 'Loki ingester holds {{ $value | printf "%.0f" }} in-memory streams (tenant {{ $labels.tenant }})'
---

# Definition

- **Loki ingester streams high** — a Loki ingester is holding close to as many streams as it can.
