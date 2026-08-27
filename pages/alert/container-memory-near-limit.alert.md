---
id: 84a0afd3-ed37-50aa-9d46-77abed3fcadb
page-type-slug: alert
title: "Container memory near limit"
slug: container-memory-near-limit
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Container {{ $labels.namespace }}/{{ $labels.container }} peaked at {{ $value | humanizePercentage }} of its memory limit"
---

# Definition

- **Container memory near limit** — a container is using close to all the memory it is allowed.
