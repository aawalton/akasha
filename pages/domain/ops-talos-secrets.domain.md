---
id: a04938ed-6c08-52b5-ac78-b4ac6f79c830
page-type-slug: domain
title: "Ops talos secrets"
slug: ops-talos-secrets
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - domain/ops-namespace
  - domain/secret
---

# Definition

- **Ops talos secrets** — the commands that make a cluster's own PKI and leave it in the repository encrypted.

# Design

Rotation is the same command re-run behind a flag, rather than a command of its own.
