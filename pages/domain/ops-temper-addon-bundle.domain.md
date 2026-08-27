---
id: d1a1d62a-89e7-5d01-9c5c-977d10b869c5
page-type-slug: domain
title: "Ops temper addon bundle"
slug: ops-temper-addon-bundle
domain-parent-slug: domain/ops-temper-addon
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops temper addon bundle** — the commands that produce the archive of Temper's addons a player installs.

# Design

The compiler these commands run stands only on this workstation, so none of them can run in the cluster.
