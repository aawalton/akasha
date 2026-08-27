---
id: 071d5e47-28d6-55e3-9d4b-572f9813cf80
slug: orphaned-files-accumulate
page-type-slug: finding
title: "497 uncommitted files stand in memory with no page beside them"
domain-slug: domain/page-storage-uncommitted
---

# Claim

497 `.uncommitted.yaml` files stand in the memory repository with no page beside them, across four code-editor page types: windows, groups, tabs and terminals hold 44 live pages against 541 uncommitted files. `domains/page-storage-uncommitted.md` states that an uncommitted file goes when its page goes, and these did not. Because an uncommitted file is gitignored, no gate, no commit and no link check ever reaches one, so nothing reports the accumulation.

# Evidence

Walked all four repos pairing each sidecar against the page its name implies. Instructions, stories and books returned zero orphans of any kind; memory returned 497, all `.uncommitted.yaml`. I did not determine what writes or removes these four page types, so the mechanism that leaves them behind is unidentified.
