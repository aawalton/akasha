---
id: 01a01153-c963-7000-a72b-87f65823e28f
page-type-slug: page-type
title: "Workstation service"
extends-slug: domain
files: akasha:**/*.workstation-service.md
body-shape-slug: domain
slug: workstation-service
domain-parent-slug: domain/service
---

# Definition

- **Workstation service** — a service the workstation runs.

# Design

Every workstation service runs under one wrapper, which restarts it when a file it reaches changes.

Every workstation service runs the code as it now stands in the repository.

A service's own imports say which files restart it, however each is spelled.

An import reaching outside this repository or into `node_modules` restarts nothing.

The wrapper follows a thousand files at most.

A workstation service's document settles whether it runs, what code it runs, its unit, and how the cluster reaches it.

# Intent

Every workstation service runs under systemd.

A workstation service is started and stopped from its document alone.

Every installed unit links to its file by one spelling of that path.
