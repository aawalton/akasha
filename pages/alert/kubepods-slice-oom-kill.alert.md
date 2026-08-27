---
id: 7978246b-1f77-5d98-a800-4f69346a47be
page-type-slug: alert
title: "Kubepods slice OOM kill"
slug: kubepods-slice-oom-kill
domain-parent-slug: page-type/alert
domain: infrastructure
summary: "Kubepods parent slice on {{ $labels.instance }} killed a container that was within its own memory limit"
---

# Definition

- **Kubepods slice OOM kill** — the kubepods cgroup slice ran out of memory and killed something inside it.
