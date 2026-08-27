---
id: ce4d971f-651f-59aa-b4a4-45a5b8c32332
page-type-slug: workstation-service
title: "Dcgm exporter"
slug: dcgm-exporter
domain-parent-slug: domain/metric
required-reading-slugs:
  - page-type/workstation-service
runs:
  - '/usr/bin/podman run --rm --replace --name dcgm-exporter --device nvidia.com/gpu=all -p 9400:9400 nvcr.io/nvidia/k8s/dcgm-exporter:3.3.8-3.6.0-ubuntu22.04'
stops:
  - '/usr/bin/podman stop dcgm-exporter'
after:
  - network-online.target
wants:
  - network-online.target
enabled: true
restart: on-failure
restart-delay-seconds: 10
needs-secrets: false
---

# Definition

- **Dcgm exporter** — the service that publishes the workstation GPU as metrics: memory, use, heat and power.
