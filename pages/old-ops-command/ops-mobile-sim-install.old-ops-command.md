---
id: a4d1e3bf-ee19-5daf-8018-4a7adfb837d1
page-type-slug: old-ops-command
title: "Ops mobile sim install"
slug: ops-mobile-sim-install
domain-parent-slug: domain/ops-mobile-sim
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/mobile/sim/install.ts
path: mobile sim install
irreversible: true
---

# Definition

- **Ops mobile sim install** — an app's iOS shell built for the simulator on the macbook and installed to a booted one.

# Help

Build the Capacitor iOS shell for the simulator and install it to a booted sim, over ssh to the macbook. Rsyncs the native shell and the shared seam sources it reads from the invoking working tree into a directory of this run's own on the mac, and compiles there — so the build is of the tree you named, and no checkout standing on that machine is read or advanced. The native shell is read from the repository the app page's `native-shell-repo-path` names, which is akasha; the SPA it stages is read from the tree CODE_ROOT names, akasha where it names none. The run prints the tree it built from with the commit it stands at, marked -dirty where the delivered sources carry uncommitted work, and stamps both binaries with that same string. Stages the SPA www/ FRESH on the workstation from the same tree and injects it before cap sync, so the sim never runs stale code (#15638; www/ is gitignored and the mac has no bun/Vite toolchain, so a bare cap sync would ship whatever bundle was last left there — the #15612 stale-sim false-negative). node_modules and ios/ under the delivered tree are left in place between runs, both being derived and both regenerated from the sources this run put there. Long build — runs in the foreground and streams. Prints BUILD_SIM_OK.
