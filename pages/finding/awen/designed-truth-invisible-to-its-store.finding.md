---
id: d135afe3-146e-523e-8f4a-12b5518ebf5c
slug: designed-truth-invisible-to-its-store
page-type-slug: finding
title: "Designed truth invisible to its store"
domain-slug: persona/awen
---

# Claim

A game's designed truth can sit entirely in the game page's `gmReference` sections while its `game-design` store is empty, and the design store's readers cannot see it — so `ops awen design-audit`, the deterministic gap-scan, reads a fully designed world as undesigned. One of eight live games carries any design rows at all.

# Evidence

Measured 2026-08-07, firsthand, while emptying `dirty/skills/agent-harness/findings/role-contracts-and-layer-seams.md`, which recorded the shape on 2026-07-28 as a `partners`-specific migration. I re-ran its surfaces rather than read them, and the denominator corrects it.

`ops page list --type game` returns a page titled "Partners", id `019f49aa-24b0-7482-b98e-a45de9d3eb6f`, whose `slug` is EMPTY and whose `externalId` is `partners-ii`. So `ops awen design --game partners` answers `no game found with externalId "partners"` and exits 2 — unreachable rather than empty for anyone using the recorded name. Neither the page id nor the title resolves; the verb keys on `externalId` alone.

`ops page show 019f49aa-... --properties gmReference` returns a designed world in the `{"sections":[{"id","body"}]}` shape: a Region and five Locales, each with What/Play framing. Against that, `ops awen design --game partners-ii` prints `(no design entries)`, exit 0, and `ops awen lore --game partners-ii` prints `(no lore entries)`.

The content is not orphaned, which bounds this. `ops awen gm-load` compiles a GM boot document from `framing/rulebook/continuity/gmContext/gmReference/state/entities`, so a GM still reads it. What cannot see it is `ops awen design` and `ops awen design-audit`, whose help calls itself "the deterministic gap-scan" and which "fails loud (exit 4) listing every incomplete gap".

Eight game pages carry an `externalId` — awen-browser-test, the-violet-hour, the-tower, dragons-and-dungeons, harem-hotel, partners-ii, playtest-date-night-9, playtest-date-night-10 — and `ops awen design` returns `(no design entries)` for seven of them. Only `harem-hotel` holds design rows, so a populated design store is the exception rather than the norm.

MEASURED 2026-08-16, closing that range at SIX: the-tower holds 51 gmReference sections, partners-ii 13, dragons-and-dungeons 7, the-violet-hour 3, the playtests 3 and 2, none with design rows. Only harem-hotel has them, at 1 section.
