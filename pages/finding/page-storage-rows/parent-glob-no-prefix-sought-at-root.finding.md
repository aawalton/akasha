---
id: 5f581954-00ed-5b0c-9d0c-6821796a6ad2
slug: parent-glob-no-prefix-sought-at-root
page-type-slug: finding
title: "A parent whose glob has no fixed prefix is looked for at the repo root"
domain-slug: domain/page-storage-rows
---

# Claim

`whereFor` resolves a parent page by name against its page type's `files:` glob, and where that glob opens with a wildcard it falls back to the repo root. `write-row` under such a parent reports the parent absent even though the page stands, and a sidecar landed at the root is reached by no reader, because the glob that finds its parent never scans there.

# Evidence

Measured 2026-08-20 by running `writeRows` against a fixture stories root, with no real record touched.

`page-types/game.md` declares `files: stories:*/played/*/game/*.md`. The glob opens with `*`, so it has no fixed directory prefix to search under.

A fixture `game` page was placed at `stories:fixture-2999-13-45/played/fx/game/fixture-game.md`, where that glob matches it, and the read path found it: `answer()` returned its `game-state` rows from the sidecar beside it.

`writeRows(roots, "game-state", "fixture-game", rows, writer)` nonetheless returned `absent`, reading `no game page is named fixture-game: nothing stands at fixture-game.md`. The `at` it chose was `stories:fixture-game.states.jsonl` — the repo root — while the page stands four directories down.

Placing the parent at the root instead makes the write succeed and land `stories:fixture-game.states.jsonl`. That file is then invisible to `pagesOf("game")`, whose glob requires `*/played/*/game/`, so the rows are written and never read.

This reaches every jsonl-held page type whose parent's glob opens with a wildcard, and it is silent in both directions: the write reports a missing parent that is present, or lands rows where nothing scans.
