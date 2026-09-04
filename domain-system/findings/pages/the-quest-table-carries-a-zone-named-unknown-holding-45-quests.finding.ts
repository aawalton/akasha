import type { Finding } from "../finding.page-type.ts"

export const theQuestTableCarriesAZoneNamedUnknownHolding45Quests = {
  id: "01a06175-dbd3-7001-818a-75e23e3f2536",
  pageTypeSlug: "finding",
  slug: "the-quest-table-carries-a-zone-named-unknown-holding-45-quests",
  domainSlug: "domain/temper",
  claim:
    "`quest-data.generated.ts` names one of its 65 zones `Unknown`, and that zone holds 45 quests. The recreation lands it as the `temper-world-zone` page `unknown` rather than losing the 45 quests, so the emitted table is reproduced byte for byte. What the game meant by `Unknown` is not settled here: the name is what the capture reported.",
  evidence:
    'Measured on 2026-09-02.\n\n`akasha/temper/temper-catalog/temper-world/world-zones/pages/unknown/unknown.temper-world-zone.ts` states `title: "Unknown"` and `zoneQuests: "jsonl"`, and the sidecar beside it holds 45 lines. The page states no `eso-zone-id`, because the quest capture reports none for any zone.\n\nDropping the zone would have lost 45 of the table\'s 2253 quests, which is 2.0 percent, and would have made the banner read 64 zones rather than 65. Keeping it costs one page.\n\nThe name sorts between `The Wailing Prison` and `Vvardenfell` under `localeCompare`, which is where `quest-data.generated.ts` already places it, so landing it changed no ordering.\n\nThe likely reading is that the capture asks the game for a quest\'s zone and takes `Unknown` where the game answers nothing, which would make these 45 quests zoneless rather than members of a zone. Nothing in the captured table says so, so the page repeats what was captured and this finding records the doubt.',
} as const satisfies Finding
