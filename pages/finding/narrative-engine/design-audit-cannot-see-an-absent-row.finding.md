---
id: 20e8875d-d8be-5dee-a8e8-d2a5a15811aa
slug: design-audit-cannot-see-an-absent-row
page-type-slug: finding
title: "Design audit cannot see an absent row"
domain-slug: domain/narrative-engine
---

# Claim

`ops awen design-audit` calls itself the deterministic gap-scan and fails loud on exit 4, but it can only find gaps INSIDE rows that exist. It samples the game's live design rows and asks whether each is fully concretized; a floor nobody designed has no row, so it is never sampled and never fails. The audit is green on a world whose next floor does not exist, which is the one gap the loremaker's standing obligation is about.

# Evidence

Measured 2026-08-07 from `/home/walton/code` while emptying `dirty/skills/awen-loremaker/SKILL.md`.

`src/awen/design-audit.ts:118` chooses what to check: `const chosen = all ? [...liveRows] : sample(liveRows, sampleN)`. Every candidate comes from `liveRows`, so the population is rows already written. The header at :12 scopes it the same way — whether "a sampled CURRENT design row is an incomplete gap" — and the help says it reads "a random --sample (default 25; --all audits every current row) of the game's LIVE (non-superseded) design rows". `--all` widens the sample; it does not change the population.

So the verb answers "is what you designed complete?" and never "did you design far enough ahead?". Only the first has an instrument.

What makes the second load-bearing is the store's purpose. `ops awen design` is the GM's resolve-before-narrate lookup, so an undesigned floor is not a missing record — it is the GM reaching a place with nothing to read and improvising a reveal, which is the failure the designed/disclosed split exists to prevent. `core/src/gm-boot-sections.ts:294` puts the obligation in the live boot text: the loremaker "plans ahead of need", and a floor is designed "BEFORE the story can reach it".

No write-side check covers it either. `core/src/design-schema.ts:251-252` validates a `world-logic` row by asking only whether its `rule` is blank, and `commit-design` boundary-parses one entry at a time, so nothing compares the store against where the story stands.

Different from `pages/finding/narrative-engine/lore-citation-unchecked-at-write.finding.md`, the symmetric verb's problem: there a check exists and is skipped at write time, then sampled thinly. Here there is no check to skip, so widening to `--all` still returns green. That one's fix moves an existing decider earlier; this needs a comparison the verb does not make.

Not measured: whether any live game has an undesigned next floor. I did not run `design-audit` against one — the live games are Alan's.
