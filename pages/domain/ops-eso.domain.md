---
id: 01a03515-5896-7000-8d6a-63bb4cace2ad
page-type-slug: domain
title: "Ops eso"
slug: ops-eso
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops eso** — the commands that rebuild what akasha carries of the ESO API.

# Design

The ESO UI source clone stands outside every repository, so a command reading it answers only on a workstation holding one.

A command here names the code checkout it writes into rather than deriving it from where its own file sits.
