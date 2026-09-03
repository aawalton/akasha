import type { Finding } from "../finding.page-type.ts"

export const nineCharacterCheckerEntriesAreAbsentFromTheAkashaCompletionCardCheckers = {
  id: "01a0674d-bf0c-76f6-a490-b1d25c911a9f",
  pageTypeSlug: "finding",
  slug: "nine-character-checker-entries-are-absent-from-the-akasha-completion-card-checkers",
  domainSlug: "domain/temper",
  claim:
    "The four `character-*-checkers` files outside akasha hold eighteen card entries between them. `akasha/temper/temper-player-completion/completion-card-checkers/completion-card-checkers.module.code.ts` inlines nine of the eighteen and drops the other nine. Ablating the four files on the strength of the merged module having the same exported name would lose those nine.",
  evidence:
    "Measured 2026-09-03 on the working tree, by listing the object-literal keys of each exported table. `character-simple-checkers` holds seven: character-level, pack-upgrades, quests, daily-writs, zone-completion, points-of-interest, alliance-rank. `character-skill-checkers` holds three: skill-lines, skill-morphs, skill-points. `character-progression-checkers` holds six: mount-training, cadwells-almanac, lore-library-character, character-achievements, companion-rapport-character, companion-quests. `character-crafting-checkers` holds two, nested a level deeper so a top-indent grep misses them: trait-research at line 112 and scribing-knowledge at line 149.\n\nThe akasha module holds nine keys: mount-training, lore-library-character, skill-lines, skill-morphs, skill-points, daily-writs, character-level, pack-upgrades, alliance-rank. Absent are quests, zone-completion, points-of-interest, cadwells-almanac, character-achievements, companion-rapport-character, companion-quests, trait-research and scribing-knowledge. Nine present plus nine absent is the eighteen, so the two counts reconcile.\n\nThe aggregator itself, `temper/player-completion/src/completion-card-checkers.ts`, was removed at `688e5c6e74`: its whole body was four spread expressions, and the merged module carries that shape. The four tables it spread are a separate lane's files and are untouched.",
} as const satisfies Finding
