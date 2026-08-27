---
id: 6755f672-a8ca-5a0a-89f5-8fef3b7c5c5b
page-type-slug: alert
title: "Pod pending"
slug: pod-pending
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Pod {{ $labels.namespace }}/{{ $labels.pod }} stuck Pending > 15m"
---

# Definition

- **Pod pending** — a pod has stayed unscheduled instead of being placed on a node.
