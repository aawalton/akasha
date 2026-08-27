---
id: e6adbd0e-715e-509c-a37f-c90119b128fd
slug: block-root-filesystem-scan
page-type-slug: refusal
title: "Block root filesystem scan"
---

# Refusal

Filesystem-root recursive scan is blocked. A recursive search/traversal rooted at / (or all of $HOME, or /proc //sys //dev) walks the entire filesystem — /proc, /sys, every mount, and the 1.8T ci-storage — pinning ~9 cores and driving workstation load past 90. This is the command class that just caused an incident.

Scope the search to the repo instead:
  - grep -rln PATTERN packages/<area>          (a directory under the repo)
  - grep -rln PATTERN .                         (the current dir, when already in the repo)
  - find packages/<area> -name '<glob>'         (a scoped start directory)
  - rg PATTERN packages/<area>                  (rg recurses the given path, not /)

If the authority you need to search for is not anywhere in the repo, that is a missing-context gap — route it up as a blocker rather than scanning the disk for it.
