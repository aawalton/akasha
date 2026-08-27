---
id: 707b8a7f-92c6-5713-b5cd-9a1e9482003f
page-type-slug: domain
title: "Network"
slug: network
domain-parent-slug: domain/resource
settled: true
---

# Definition

- **Network** — what a program reaches other machines over.

# Design

Traffic reaches the cluster through a tunnel opened from inside it, rather than through a port opened to it.

The name a machine joins the private network by is the exception, answered directly at the cluster's public address.

A workload in the cluster reaches a machine at its local address, and not at the name it joins the private network by.
