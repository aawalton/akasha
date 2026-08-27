---
id: dceb2def-3aac-5377-920d-2c03627f00b8
page-type-slug: old-ops-command
title: "Ops temper catalog invalidate"
slug: ops-temper-catalog-invalidate
domain-parent-slug: domain/ops-temper-catalog
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/catalog/invalidate.ts
path: temper catalog invalidate
---

# Definition

- **Ops temper catalog invalidate** — a version bump written into the catalog addon's side file, naming the domains to collect again.

# Help

Bump TemperCatalogConfig.lua's invalidateVersion so the TemperCatalog addon re-collects the named domains on its next boot or /reloadui. Either `--domain <name>` (repeatable) or `--all` is required; the two are mutually exclusive. `--all` writes an empty `invalidateDomains` list, which the addon-side reader interprets as 'invalidate every DOMAIN_REGISTRY key'.

The command is idempotent on the request shape — re-running with the same domain set against the same prior side-file bumps the version once more (the addon ignores already-applied versions via its `lastSeenInvalidateVersion` counter). Domain names are validated against the hardcoded list in `domain-keys.ts` (kept in sync with the addon's `DOMAIN_REGISTRY` by a drift-check unit test).

Default stdout: one-line summary `OK invalidateVersion=<n> invalidateDomains=<list-or-all>`.
--json stdout: the full new SideFile object that was written.
