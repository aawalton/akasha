---
id: da19d5f9-601c-52ea-9f16-9c339d1dc787
page-type-slug: old-ops-command
title: "Ops write"
slug: ops-write
domain-parent-slug: domain/ops-global
required-reading-slugs:
  - page-type/old-ops-command
command-path: ops-cli/global/write/write.command.code.attachment.ts
path: write
irreversible: false
---

# Definition

- **Ops write** — whole file bodies carried in, gated together and landed or refused as one.

# Help

Write whole files as a patch, gated before anything lands.

A call addressing akasha is turned into a patch against HEAD and the checks akasha defines are run over the files that patch changes, before anything reaches disk. A call addressing any other repository lands unjudged, those repositories having no checks. A path inside no repository is written where it lies, with nothing committing it.

Every body reaches this as a whole file. Where the path's extension has a file kind stating `binary: true` the bytes land exactly as read; every other body is decoded as UTF-8 and refused where it does not decode.
