---
id: e360f5df-9ff5-50dd-9f53-965bc7ffb489
page-type-slug: finding
title: "Loremaster nudge unimplemented"
domain-slug: domain/narrative-engine
---

# Claim

The GM's live boot prose tells a GM the loremaster and loremaker seats are best-effort nudged on each publish and repair. No such wiring exists: `publish-turn.ts` holds no nudge, wake, spawn or agent-send call at all. A GM who turns `maintainsLore` or `maintainsDesign` on and relies on the documented wake gets a store that silently never reconciles — the seat is never told a turn was published, and nothing at publish time reports the widening gap.

# Evidence

Measured 2026-08-08 from `/home/walton/code` while emptying `dirty/code/packages-alanwalton-awen-claude.md`.

The claim is live GM-facing text. `gm-boot-sections.ts:288` (loremaster) and `:294` (loremaker) both read "On each publish/repair it is best-effort nudged". `gm-boot-compile.ts` imports that module and the sections compile into what `ops awen gm-load` serves at boot, so it is not dead text.

Nothing implements it. `rg -n -i 'nudge|wake|spawn|loremaster|loremaker|agent send'` over `packages/alanwalton/awen/src/awen/publish-turn.ts` exits 1 — six terms, case-insensitive, no hit; the file is tracked and live. The same pattern over `repair-turn.ts` returns only `emitRepairEventBestEffort`, which names neither seat.

The named functions are gone. `loremaker-nudge.ts` and `loremaster-nudge.ts` are absent from `git ls-files` by basename across the repo, and `nudgeLoremakerBestEffort` is absent from `packages/` under both bare `rg -l` and `rg -uuu -l`, both exiting 1.

The flags they would gate are live, which is what makes the gap silent. `maintainsLore` and `maintainsDesign` are declared at `game-config-schema.ts:65,72`, written at `game-root-write.ts:87,90`, and `lore.ts:156` branches on `game.maintainsLore === true`. Turning the flag on does something visible, so its wake never firing does not read as a broken switch.

One mitigation bounds it: `lore.ts:33` says the `lore` verb reports its own staleness for a `maintainsLore` game, warning on stderr with the count. A GM who queries is warned; one who does not is not.

Different from `pages/finding/narrative-engine/gm-boot-spawns-dead-slash-prompts.finding.md`, which I opened before filing: that records the four `spawn --prompt '/slash'` calls in the same file not resolving since #17353, so the seat never gets a procedure. This is the wake — a correctly spawned seat holding its full procedure would still never learn a turn was published.
