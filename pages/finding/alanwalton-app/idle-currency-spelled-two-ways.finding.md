---
id: cad05ca6-3ae1-57d6-9b34-af2d8376ca48
page-type-slug: finding
title: "Idle currency spelled two ways"
domain-slug: domain/alanwalton-app
---

# Claim

The idle game's currency is called `moments` everywhere a player or a store can see it and `motes` in five places inside the gacha core, all of them prose — three comments and two test names — so the only readers who meet the second spelling are the ones reading the code that spends it.

# Evidence

Measured over `packages/alanwalton/web/app/idle/` in `~/code`, tracked files only.

`rg -n "motes"` returns five occurrences and no identifier among them: `lib/core/constants.ts:195` "Draw cost (motes) escalates within an ascension cycle"; `lib/core/gacha/state.ts:52` "The current per-draw cost in motes"; and three in `lib/core/gacha/draw.unit.test.ts` — the header at `:9`, the describe at `:57` "gacha · draw cost (motes, escalates within cycle, resets on ascend)", and the test name at `:67` "insufficient motes ⇒ no-op".

`rg -c "moments"` returns hits in twelve files on the other side, including the ones a player reaches. `components/universal-title-bar.tsx:65` binds `const moments = displayedResource(state, now)` and its header at `:9-14` describes "the live YELLOW Moments readout" and the `Moments/s` rate. `lib/reason-copy.ts`, `lib/idle-draw-verb.ts`, `lib/idle-card-page-type.ts` (eight occurrences) and `idle.css` (six) all use the same word.

The two spellings meet at the same value. `drawCost` in `state.ts:54-56` returns the number the comment above it calls motes, and `applyDraw` compares it against `s.resource` at `draw.ts:149` — the field the title bar renders as Moments.

Nothing refuses this. `ops enforcement list` names 232 wired mechanisms and none is a vocabulary check over this package; `check-app-intent-brand-words` is the nearest and governs brand words rather than in-game nouns.

Found while emptying `dirty/code/packages-alanwalton-web-app-idle-docs-gacha.md`, whose own "Draw cost" section says the cost is "Paid in **moments**, the existing single currency" — the quarantined document sided with the interface, and the code comments beside the arithmetic did not.
