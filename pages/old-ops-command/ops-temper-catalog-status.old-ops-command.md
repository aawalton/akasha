---
id: eba7a5d1-122a-51d0-934b-24593f5e3912
page-type-slug: old-ops-command
title: "Ops temper catalog status"
slug: ops-temper-catalog-status
domain-parent-slug: domain/ops-temper-catalog
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/catalog/status.ts
path: temper catalog status
---

# Definition

- **Ops temper catalog status** — per-account, per-domain collected, pending and skipped state, read off the addon's two files.

# Help

Read the TemperCatalog SavedVariables file and the TemperCatalogConfig.lua side-file, then print per-domain collected / pending-invalidation / skipped state for each account in the SavedVariables file, plus a summary block with the addon's completed flag, lastSeenInvalidateVersion, and the side-file's invalidateVersion.

A domain is `collected` when its key appears under `Default[<account>][$AccountWide]`. A domain is `pendingInvalidation` when the side-file's `invalidateVersion` exceeds the account's `lastSeenInvalidateVersion` AND the domain is named in the side-file's `invalidateDomains` (or `invalidateDomains` is empty, encoding --all). A domain is `skipped` when the account's `collectionSkips` names it as a reason the last walk could not bank it — a hard failure, distinct from merely `pending`; collected wins if the two ever disagree, since a domain whose key is present cannot also be skipped.

Default stdout: TSV with columns `account\tdomain\tcollected\tpendingInvalidation\tskipReason`, followed by a blank line + summary lines. `skipReason` is empty unless the domain is skipped.
--json stdout: `{ accounts: [{ account, completed, apiVersion, manifestApiVersion, lastSeenInvalidateVersion, domains: [{ domain, collected, pendingInvalidation, skipReason }] }], sideFile: {...} | null }`. `skipReason` is `string | null`.
