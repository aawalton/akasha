---
id: e5c58c1e-da93-5a56-b221-83f995d09492
page-type-slug: domain
title: "Ops page secret"
slug: ops-page-secret
domain-parent-slug: domain/ops-page
required-reading-slugs:
  - domain/ops-namespace
  - domain/page-storage-secret
---

# Definition

- **Ops page secret** — the `ops` namespace for a page's secrets.

# Design

Which keys a page may hold is the page type's call, read off the file tree as it stands.

A path no page type claims is refused.

A key a page type does not declare secret is refused, naming the ones it does.

The repository is the one the page stands in, and no flag names it.
