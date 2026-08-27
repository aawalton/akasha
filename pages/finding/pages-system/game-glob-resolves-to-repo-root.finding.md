---
id: c8563d5c-3608-5bf8-831f-561cba9175c5
page-type-slug: finding
title: "The game page type resolves a new page to the stories repo root"
domain-slug: domain/pages-system
---

# Claim

`page-types/game.md` declares `files: stories:*/played/*/game/*.md`, a glob whose every leading segment is a wildcard. A page that states none of them resolves to the root of the `stories` repository, and nothing refuses it. The `stories` repo is gated and pushes itself, so a test fixture written through the file-backed create path lands at the top of Alan's stories.

# Evidence

Measured 2026-08-20 by running `relPathFor` against a new `game` page. It resolved to `zz-....md` at the repo root and round-tripped, so no gate treats the placement as wrong.

This surfaced while repointing `packages/shared/browser-test-harness` off the database. `awen-read-muting.browser.test.ts` could not create a page at all before the repoint, because `page_create` raises `page type not found for slug %` and only `page-type` and `property-definition` still have rows. The repoint fixes the write path. Fixture placement is what remains, and it is a declaration matter rather than a code one.

Two things checked and found not to be defects, so that neither is re-opened. `isFileBacked("game-turn")` answers true — `game-turn` reaches the roster through a `data: jsonl` sidecar home at `properties/game-turns.md`, and its `files: none` is deliberate. A negative control on a slug that cannot exist answered false, so the true is not a blanket yes.

A glob with a fixed prefix would place these. Which prefix is right depends on where Alan wants game pages to live, and `Every Changed Line` puts that on him.
