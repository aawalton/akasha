---
id: e8762320-ad07-5550-b0fc-2a0bf623d3b4
page-type-slug: page-type
title: "Cluster service"
extends-slug: domain
files: akasha:**/*.cluster-service.md
body-shape-slug: domain
slug: cluster-service
domain-parent-slug: domain/service
required-reading-slugs:
  - domain/workload
---

# Definition

- **Cluster service** — a service the cluster runs as a workload.

# Design

A cluster service runs one copy unless it is deliberately spread across nodes.

A cluster service is one Kubernetes resource carrying a pod template.

The Kubernetes `Service` resource is not one.

# Intent

A cluster service sits under the domain it is, rather than under this page type.
