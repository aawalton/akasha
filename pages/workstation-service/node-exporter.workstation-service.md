---
id: cc076f45-cf35-5274-966e-70441fe4e693
page-type-slug: workstation-service
title: "Node exporter"
slug: node-exporter
domain-parent-slug: domain/metric
required-reading-slugs:
  - page-type/workstation-service
runs:
  - '/home/linuxbrew/.linuxbrew/bin/node_exporter --web.listen-address=:9100'
enabled: true
restart: on-failure
restart-delay-seconds: 5
needs-secrets: false
---

# Definition

- **Node exporter** — the service that publishes the workstation's processor, memory, disk and network as metrics.
