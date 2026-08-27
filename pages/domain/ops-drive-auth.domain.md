---
id: f4b97069-9a24-5ed1-83ee-3c388816289a
page-type-slug: domain
title: "Ops drive auth"
slug: ops-drive-auth
domain-parent-slug: domain/ops-drive
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops drive auth** — the command that turns Alan's consent into the token every other Drive command reads.

# Design

The consent is Alan's and given in a browser, so no run here completes without him.

The token is printed for Alan to keep; nothing here stores it.
