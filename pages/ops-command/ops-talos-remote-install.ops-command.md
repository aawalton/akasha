---
id: 8cb1d9c4-e3b2-5d21-9fdb-a7eece7fe017
page-type-slug: ops-command
title: "Ops talos remote-install"
slug: ops-talos-remote-install
domain-parent-slug: domain/ops-talos
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/talos/remote-install.ts
path: talos remote-install
irreversible: true
---

# Definition

- **Ops talos remote-install** — replacing the Linux running on a remote node with Talos, over SSH.

# Help

Install Talos onto a remote node that's currently running Linux. SSHes in, then either kexecs the host into the Talos installer kernel (default — fixes the UEFI NVRAM gap surfaced in #11447) or streams the metal raw image directly to disk and reboots.

After this command returns, the node is in Talos maintenance mode and ready for `ops talos apply`. Destroys all data on the target install disk — pass --confirm-wipe to acknowledge. The dd path wipes immediately; the kexec path defers the disk write until `ops talos apply` triggers the actual installer (which uses efibootmgr to write a proper UEFI NVRAM entry).
