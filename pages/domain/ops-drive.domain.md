---
id: 592d3daf-b640-5164-b853-61c88fc77fa5
page-type-slug: domain
title: "Ops drive"
slug: ops-drive
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
---

# Definition

- **Ops drive** — the commands that pull a file out of Alan's Google Drive, and the consent they run on.

# Design

Every command here reads. Nothing under this namespace writes to Drive, and the scope the consent asks for says so.

The OAuth app is the Gmail one; the only credential of Drive's own is the refresh token.
