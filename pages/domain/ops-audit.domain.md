---
id: e6f5d033-5b5a-56cc-8716-e9aa806f429f
page-type-slug: domain
title: "Ops audit"
slug: ops-audit
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - domain/audit
---

# Definition

- **Ops audit** — the audits taken over all of something as it stands, rather than over one change to it.

# Design

Every command prints one reading — how much it looked at, how much it weighed, and what it found — and `--json` gives that same reading on one line.
