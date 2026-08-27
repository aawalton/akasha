---
id: d2063fe1-6cec-5e3a-ad4f-a238a14263c9
page-type-slug: ops-command
title: "Ops temper community-addon update"
slug: ops-temper-community-addon-update
domain-parent-slug: domain/ops-temper-community-addon
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/temper/community-addon/update.ts
path: temper community-addon update
---

# Definition

- **Ops temper community-addon update** — every outdated third-party addon re-fetched from ESOUI and swapped in, folder by folder.

# Help

Update installed third-party ESO addons from ESOUI — the Minion-free path. Fetches the ESOUI catalog, compares against installed versions, then downloads, MD5-verifies, and installs each outdated addon (atomic per-addon swap). Folders on the deploy pipeline's install roster are always skipped (deploy-owned); unmatched/orphan folders are never deleted.
