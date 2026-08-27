---
id: ed17d90f-2c82-5306-ba43-788116a3bda8
page-type-slug: alert
title: "Kubepods OOM collector stale"
slug: kubepods-oom-collector-stale
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Kubepods OOM collector on {{ $labels.instance }} has stopped refreshing — tripwire reading is frozen"
---

# Definition

- **Kubepods OOM collector stale** — the collector reading out-of-memory kills from the kubepods slice has stopped writing.
