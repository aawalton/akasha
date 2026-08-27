---
id: e6d05532-b8a7-576a-8acc-aacf7d328034
page-type-slug: domain
title: "Ops elaine"
slug: ops-elaine
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - page-type/health-sample
---

# Definition

- **Ops elaine** — the commands that read Alan's Apple Health export off the macbook, to report it and to store it.

# Design

Apple Health lives on the iPhone, so both commands read an export archive somebody dropped on the macbook rather than a device or an API.

The archive is reduced to the metrics asked for on the macbook, so it never crosses the wire whole.

Neither command keeps what it fetched, so every run pays for the whole archive again.
