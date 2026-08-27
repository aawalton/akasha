---
id: 5b37bfff-6745-4654-8114-a45b0dd008d0
page-type-slug: initiative
slug: aine-global
persona-slug: aine
domain-slug: domain/global
---

# Intent

# Notes

Carried out of the initiative review of 2026-08-27, where twenty-four initiatives became four. Each item below is open, and no seat is working any of them.

**Two routes now answer where a page type is found.** `page/property/registry.ts` reads the index and this write's pending set; `9a36a438f` and `a2fa2eeee` broaden the globs where a tree spans the repositories. Both are in the tree, the panel goes through the first, and the seat that wrote the second has not been told.

**`staleIn` has no callers.** Nothing checks the index is current, and the page type registry now reads it, so an index that drifted would be believed. Alan carries this with Astra.

**Eleven tools under `tools/` still declare `repos: ["instructions"]`** and are unreachable, that namespace having gone with the repo page. `champions` was repointed to `akasha` because the domain panel calls it; `dag`, `holds`, `pages`, `reaches`, `declarations`, `compose-boot`, `compose-subagents`, `rename-property`, `rename-token`, `ios-widget-emit` and `playwright-storage-state` were not.

**A gate demanded a read of `agent/seat/athena.seat.md`** during a write whose change set never named that file, and which the worktree showed unmodified. The rename landed under `--mechanical`, so the refusal was set aside rather than accounted for.

**Twenty-one findings moved to `pages/finding/old-ops-command/`** unchanged, when the page type took its `old-` prefix. Several claim things about ops commands in general, which the surviving `page-type/command` now holds.
