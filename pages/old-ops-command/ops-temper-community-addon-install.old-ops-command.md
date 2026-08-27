---
id: d0fc03d4-2e5a-58ac-b936-772807cb4512
page-type-slug: old-ops-command
title: "Ops temper community-addon install"
slug: ops-temper-community-addon-install
domain-parent-slug: domain/ops-temper-community-addon
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/temper/community-addon/install.ts
path: temper community-addon install
---

# Definition

- **Ops temper community-addon install** — one third-party addon fetched from ESOUI by name and unpacked into the AddOns folder.

# Help

Fresh-install a third-party ESO addon from ESOUI by name — the Minion-free path for a NEW addon (use `update` for ones already installed). Resolves <name> against the ESOUI catalog by its UIName (e.g. "Tamriel Trade Centre") or one of its install folders (e.g. TamrielTradeCentre), then downloads, MD5-verifies, and atomically swaps in the folder(s) that entry ships. Idempotent: skips when every target folder is already present. Installed UNMANAGED — never stamped in the deploy install-manifest, so the pipeline's addon prune provably never removes it.
