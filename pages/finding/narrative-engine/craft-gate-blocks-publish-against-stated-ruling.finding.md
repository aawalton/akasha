---
id: 277d7e06-7574-5945-b5c0-e25a9a229e04
slug: craft-gate-blocks-publish-against-stated-ruling
page-type-slug: finding
title: "Craft gate blocks publish against stated ruling"
domain-slug: domain/narrative-engine
---

# Claim

One live game publishes behind a craft gate while the only surface stating the policy says none does. Partners (`partners-ii`) carries `requiresPerTurnGate: true`, so `publish-turn` refuses a turn without a passing gate verdict, and its adopted census scores craft dimensions by name. The policy is stated only on a quarantined document reporting a direct Alan ruling of 2026-07-11: no craft review, at any scale or on any live game, is publish-blocking. Nothing live states it either way.

# Evidence

Measured 2026-08-08 from `/home/walton/code` while emptying `dirty/code/packages-alanwalton-awen-docs-craft-author-editors.md`, whose lines 10-16 carry the ruling.

The refusal is real and I read the code rather than the help. `publish-turn-core.ts:67` and `:83` implement `buildGatedPublishTurnIntent`; `publish-turn-core.unit.test.ts:176-185` asserts case (b), "Flag ON with no passing verdict refuses", as `expect(gated.kind).toBe("refuse")`. `ops awen publish-turn --help` states the same: a REGEN or absent verdict is refused, an EXHAUSTED one publishes marked `publishedWithGateOverride`.

The flag is a ROW, not a repo value, so no code search answers it. `ops page list --type game --properties title,requiresPerTurnGate` over all twelve live games returns exactly one `true`: Partners. Every other game is unset.

The gate scores CRAFT. `ops awen gm-load --game partners-ii` prints Partners' adopted census including `earned-peak`, `window-pane-prose`, `show-dont-tell`, `spoken-register` and `voice-distinctness` by name — craft dimensions, not mechanical ones.

Nothing live states the policy either way. `rg -uuu -in "advisory|editor seat|verbosity"` over `domains/` in the instructions repo returns zero, and no live document in either repo names the ruling. The document that does is under `dirty/` and queued for its own emptying, so the discrepancy disappears with the sweep unless it is recorded here.

Not measured: whether Alan set `requiresPerTurnGate` on Partners after 2026-07-11 or before, which would decide whether the configuration or the ruling is the thing that drifted. I did not read `page_versions` history for that row. I also did not check whether the gate seat is considered distinct from the advisory editor fleet by anyone currently operating the game.
