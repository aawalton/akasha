---
id: 87bb80ed-2bfa-5d57-b551-fe7d1f0b5b00
page-type-slug: domain
title: "Ops finding"
slug: ops-finding
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - page-type/finding
---

# Definition

- **Ops finding** — the `ops` namespace for findings.

# Design

The repository a finding stands in is read off `pages/page-type/finding.page-type.md`, and no flag names it.

The domain a finding is keyed to is validated against akasha, whatever repository holds the finding.
