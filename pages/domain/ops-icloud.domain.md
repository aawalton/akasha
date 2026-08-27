---
id: 82744968-6858-50f1-a221-5551ad9440b3
page-type-slug: domain
title: "Ops icloud"
slug: ops-icloud
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops icloud** — the command that pulls the photos out of an iCloud shared album.

# Design

The share link is the whole of the access; no Apple account or credential is needed.

It writes into the working directory unless told otherwise, and prints every path it wrote.
