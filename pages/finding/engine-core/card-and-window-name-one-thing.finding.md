---
id: e1f0c7c4-1ed7-5cd2-94d9-4680fe2dc06f
page-type-slug: finding
title: "Card and window name one thing"
domain-slug: domain/global
---

# Claim

The engine calls one thing by two names. Its schema calls the diegetic popup a system window — `SystemWindowSchema`, the union of `QuestWindowSchema`, `ItemAwardSchema` and `StatusAssessmentSchema`, reached as `window:` on a system beat. Its lint message and every world's rulebook call the same thing a card. A game master reading the lint has no path to the schema that validates what they wrote, because the two share no word.

# Evidence

Measured 2026-08-16 over `packages/alanwalton/awen`, while compressing the doctrine bands into rules on `domains/roles/game-master.md`.

`core/src/system-window-schema.ts` names the structure: `QuestWindowSchema`, `ItemAwardSchema`, `StatusAssessmentSchema`, exported together as `SystemWindowSchema`. `core/src/beat-schema.ts` reaches it as the optional `window:` key on `SystemBeatSchema`.

Against that, `core/src/gm-voice-lints.ts:80` tells a game master "the System voice rides its own cards behind {{system}} position markers", and `core/src/rulebook-schema.ts:115` declares `cardVocab`, which `core/src/reference-rulebooks.ts:134` fills for the-tower with `LEVEL UP, SKILL, AFFINITY, CLASS, TITLE`.

So `card` appears in what a game master is told and in what a world declares, and `window` appears in what validates the result. Neither name reaches the other.

The population is the whole of `packages/alanwalton/awen`; the search was over every `.ts` file under it, tests excluded from the count.

Which name should stand is not settled here. `window` is the schema's and would be the ordinary reading. `cardVocab` is per-world declared data, so renaming it reaches every world's rulebook rather than only the code.
