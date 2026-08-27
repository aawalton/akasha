---
id: 54928b47-ca53-5ff1-a02d-4c55914c619a
page-type-slug: ops-command
title: "Ops temper catalog list"
slug: ops-temper-catalog-list
domain-parent-slug: domain/ops-temper-catalog
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/catalog/list.ts
path: temper catalog list
---

# Definition

- **Ops temper catalog list** — every domain key the catalog addon collects under.

# Help

List the 20 TemperCatalog domain keys (the addon's `DOMAIN_REGISTRY`). Use the printed keys as `--domain <name>` arguments to `ops temper catalog invalidate`.

Default stdout: TSV with column `key`, one domain per row.
--json stdout: `{ domains: [...] }`.
