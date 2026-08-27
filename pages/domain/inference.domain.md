---
id: 2bab7b86-261d-51aa-b4ef-1ddd4be3753a
page-type-slug: domain
title: "Inference"
slug: inference
domain-parent-slug: domain/infrastructure-definitions
settled: true
---

# Definition

- **Inference** — the services that run models and keep a record of every run.

# Design

Inference runs on machines outside the cluster, reached over the private network.

One model is loaded at a time, and loading another evicts it.

A few services are marked warm and are not evicted for each other.

One inference runs at a time, however many models are resident.

A model is loaded before its service reports healthy, rather than on the first request.
