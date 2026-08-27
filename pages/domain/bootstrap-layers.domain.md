---
id: 31ccfca6-f24d-54c5-bbcd-5080e2107d1b
page-type-slug: domain
title: "Bootstrap layers"
slug: bootstrap-layers
domain-parent-slug: domain/cluster-provisioning
---

# Definition

- **Bootstrap layers** — the ordered stages an empty cluster is brought up in.

# Design

The toolchain layer reuses two of `prep.workflow`'s steps and no more.

The private CI image `ci-images` builds does not exist before L3.
