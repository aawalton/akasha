---
id: 303aca4e-37f0-5469-9f81-7a313cd7c377
page-type-slug: finding
title: "Promote installs never refreshed"
domain-slug: domain/code-editor
---

# Claim

A promote seeds an installed directory that is missing, and never refreshes one that is present, so a dependency change in an extension that already holds a `node_modules` in the staging tree is compiled and driven against the old copy.

# Evidence

`tools/promote.sh` at `dd3a7e8` in the code-editor repo, added by project 18933. Its `seed_installed` function tests `[ ! -e "$dst" ]` before copying, so a directory already standing in the target tree is left exactly as it was, however old. The staging tree is seeded once per directory and then persists across every later promote, because only the tracked files are replaced by the checkout.

Both trees are reached this way: staging is seeded from the working checkout, and the live tree from staging.

Measured on 2026-08-13: `extensions/notebook-renderers/node_modules` in the staging tree was placed by `tools/install-live.sh` when the three-tree mechanism landed and has never been advanced by a promote. `extensions/media-preview/node_modules` was placed by the first run of this seeding on 2026-08-12 and will not be advanced by a later one either.

This fails at the gate rather than silently, which is why it was not fixed inside 18933 and why it is filed rather than carried. What it costs is a promote refusing for a reason that reads as a compile error in an extension whose source is correct — the same shape as the fault 18933 was created for, one layer along.

No criterion on 18933 asked for synchronisation, and the seat named this residual itself rather than leaving it to be found.
