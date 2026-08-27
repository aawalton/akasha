---
id: b5fef2ec-8c2f-5044-8129-eeb7616623bb
slug: doctrine-binds-and-scores-separately
page-type-slug: finding
title: "Doctrine binds and scores separately"
domain-slug: domain/narrative-engine
---

# Claim

The doctrine pack states the same claims twice. Its nine policies bind a game master; its twenty gate dimensions score one. Nine of the twenty restate a policy, five of them under the same id, and the two lists sit in one file as separately authored prose with nothing comparing them. Now that the policies stand as rules on `domains/roles/game-master.md`, several claims are stated in three places at once, and nothing reports it when one of the three moves.

# Evidence

Measured 2026-08-16 over `packages/alanwalton/awen/src/awen/doctrine-pack-seed.ts`, all 287 lines, while planning what of it should leave the code repository.

The file holds two lists. `GATE_DIMENSIONS_SEED` runs lines 7 to 117 and carries twenty entries, each an id and a title. `DOCTRINE_PACK_SEED.policies` runs lines 120 to 239 and carries nine, each an id, a title, a description and bands. `gateDimensions:` at line 286 copies the first list into the pack, so both ship as one artifact.

Five ids appear in both lists, differing only by the `doctrine:` prefix: `beat-length-variance`, `system-voice`, `channel-separation`, `card-eligibility`, `sheet-descriptions`. Four more pair by content rather than id: gate `perceivable-bound` against policy `doctrine:pov-agency`, gate `canon-feedback` against `doctrine:canon-immutable`, and gate `invisible-turns:invitation-close` against the handoff band of `doctrine:pov-agency`.

That leaves eleven gate dimensions with no policy behind them at all: `invisible-turns:boundary-seam`, `:mechanical-echo`, `:meta-leak`, `:cadence-tell`, `emergent-story-dm-register`, `earned-peak`, `window-pane-prose`, `register-as-distribution`, `turn-boundaries`, `setting-coherence`, `character-fidelity`, `impartial-arbiter`. A game master is scored on those and never told them.

The nine policies now also stand as nine rules on `domains/roles/game-master.md`, landed 2026-08-15 and 2026-08-16. Two of the eleven original rules were since cut: `doctrine:ooc-feedback` became a Design line on `domains/narrative-engine.md`, and `doctrine:friction-report` was dropped as already covered by the general `file-finding` task. Both bands still stand in the code.

The population is the one file; nothing outside it was searched for further copies.

Re-measured 2026-08-27 in akasha. `packages/alanwalton/awen/src/awen/doctrine-pack-seed.ts` is gone, and with it `GATE_DIMENSIONS_SEED` and `DOCTRINE_PACK_SEED`; `alanwalton/awen-core/src/gm-doctrine-pack.ts` is a 129-line schema and merge module now, holding no authored list. The two lists moved into per-game data, so the duplication is copied rather than removed: each of the seven `pages/game/personas/*/*.game.gm-context.attachment.json` carries both. Partners (`partners-ii`) holds 25 policies against 24 gate dimensions, of which twelve policy ids are a gate id under a `doctrine:` prefix — `beat-length-variance`, `system-voice`, `channel-separation`, `card-eligibility`, `sheet-descriptions`, `window-pane-prose`, `register-as-distribution`, `turn-boundaries`, `intimacy-register`, `show-dont-tell`, `spoken-register` and `voice-distinctness` — and `system-voice` stands under both spellings at once. Twelve gate dimensions still have no policy behind them: `perceivable-bound`, the five `invisible-turns:` arms, `emergent-story-dm-register`, `earned-peak`, `setting-coherence`, `canon-feedback`, `character-fidelity` and `impartial-arbiter`. The third statement is `pages/role/game-master.role.md`, where the policies stand as rules.
