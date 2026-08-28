---
id: 3129b56c-369a-5c54-9751-889442cecac5
slug: camelcase-property-keys-match-their-sidecar-rows
page-type-slug: finding
title: "Forty-two camelCase property keys are correct, because the sidecar rows they describe spell the same"
domain-slug: domain/pages-system
---

# Claim

Forty-two temper property documents declare a camelCase `key:`, and for these three page types that is correct rather than a defect. Their pages are jsonl sidecar rows that spell the same camelCase, so the documents and the data agree and the query path answers correctly. The reason to leave them alone is that agreement, not any breakage a rewrite would cause: the corrected mechanism below shows a kebab rewrite would be safe at the `getPages` boundary.

# Evidence

Run on 2026-08-20 against the working tree and the live page query service, not read.

Reading the first `key:` line of every `properties/temper-*.md`: 42 declare a key containing a capital. They fall on exactly three types — `temper-mined-item` (29 keys), `temper-mined-quest` (6) and `temper-net-worth-snapshot` (7). No other temper type has one; `temper-task`, `temper-completed-task`, `temper-completed-month` and `temper-character` all declare kebab throughout. Across every `properties/*.md` the split is 233 camelCase against 1,920 kebab.

All three types report `repo: null, glob: null` on the `/page-types` roster and are held in a sidecar — `temper-mine.items`, `temper-mine.quests`, `temper-net-worth-day.snapshots`. Asking the query service for each returns rows whose own keys are camelCase: `temper-mined-item` gives `abilityCooldown, abilityDescription, abilityHeader, armorRating, armorType, enchantDescription`; `temper-mined-quest` gives `minedAt, questId, questType, repeatableType`; `temper-net-worth-snapshot` gives `dataTimestamp, totalValue`. Populations are 155,440, 3,373 and 3,246, which is 162,059.

Mechanism corrected 2026-08-28; what stood here was false and is struck. This paragraph read that `camelizeKey` returns `abilitycooldown` for `abilityCooldown`, so that `getPages` mangled the spelling the data uses and a kebab rewrite would break these types.

`camelizeKey` now stands at `shared/pages-access/src/file-rows.ts:37-43`. Run through it: `abilityCooldown` returns `abilityCooldown` and `ability-cooldown` returns `abilityCooldown`; `userId` returns `userId` and `user-id` returns `userId`. It is idempotent on camelCase and carries both spellings to one key, so `getPages` mangles nothing and a kebab rewrite would not break these three types.

What survives is the agreement itself: the documents declare what the rows spell. The deterrent does not survive.
