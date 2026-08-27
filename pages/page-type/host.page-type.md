---
id: 715ce6d5-6e88-5397-b177-65894880e182
page-type-slug: page-type
title: "Host"
extends-slug: domain
files: akasha:**/*.host.md
body-shape-slug: domain
slug: host
plural-slug: hosts
domain-parent-slug: domain/infrastructure
sequence-slugs:
  - host/workstation
  - page-type/cluster
  - host/macbook
settled: true
---

# Definition

- **Host** — a place the system runs programs.

# Design

Only a node's configuration is declared; every other machine is set up by hand.
