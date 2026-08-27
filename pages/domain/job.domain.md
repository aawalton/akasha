---
id: 88591953-1576-529a-a7d7-cf3d53ca5b98
page-type-slug: domain
title: "Job"
slug: job
domain-parent-slug: domain/workload
---

# Definition

- **Job** — a workload that runs to completion and stops.

# Design

A job that fails leaves its object behind, and a later run succeeding does not remove it.
