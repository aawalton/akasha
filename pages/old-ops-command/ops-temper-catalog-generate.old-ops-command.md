---
id: 21f0e570-8beb-52f0-b1bc-186637bd57ec
page-type-slug: old-ops-command
title: "Ops temper catalog generate"
slug: ops-temper-catalog-generate
domain-parent-slug: domain/ops-temper-catalog
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/catalog/generate.ts
path: temper catalog generate
irreversible: false
---

# Definition

- **Ops temper catalog generate** — one tier of Temper's completion catalog, emitted from what the addon captured into SavedVariables.

# Design

The files this emits are tracked in akasha, and the checkout it writes them into is named rather than assumed.

Each file this emits names this invocation in its own header.

No run emits more than one tier.

The lore-library tier is not run against a capture that carries no collection names.

# Help

Read the SavedVariables file the named tier is captured into, extract that tier's catalog,
and write the data file the Temper completion packages import.

The generators and the tree they write into are both akasha, and the files they emit are
tracked there. A run therefore changes akasha's working tree, and the checkout it writes
into is named below rather than assumed.

Every schema each tier parses against is imported directly from the package that declares
it, so a run parses against the schemas standing beside it and the checkout named below
settles only what is written.

A run needs a capture the addon flushed on `/reloadui` or `/quit`, so the answer is as old
as that flush. Where the tier's catalog was never captured, the run fails with exit 2.
