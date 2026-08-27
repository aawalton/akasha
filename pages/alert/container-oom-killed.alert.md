---
id: b65ff8f7-739c-5089-8d92-c76b58a994c5
page-type-slug: alert
title: "Container OOM killed"
slug: container-oom-killed
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Container {{ $labels.namespace }}/{{ $labels.pod }}/{{ $labels.container }} is OOM-killed and restarting"
---

# Definition

- **Container OOM killed** — a container was killed for running out of memory.
