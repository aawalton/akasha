import type { Finding } from "../finding.page-type.ts"

export const theCharactersAddOnHoldsASecondCopyOfTheSkillPointSourcesAkashaLanded = {
  id: "01a061da-4fe3-7d67-83ea-d73a479afac4",
  pageTypeSlug: "finding",
  slug: "the-characters-add-on-holds-a-second-copy-of-the-skill-point-sources-akasha-landed",
  domainSlug: "domain/temper",
  claim:
    "`src/skill-point-data.ts` in the TemperCharacters add-on is a second copy of the zone and dungeon skill-point domain that landed `temper-player-completion` already holds, across `skill-point-zone-sources`, `skill-point-group-dungeons`, `skill-point-public-dungeons` and `skill-point-general-sources`. Both are keyed the same way. Carrying the file across during the add-on's migration would land the duplicate a second time, so it is declined rather than recreated.",
  evidence:
    "Measured 2026-09-02. The add-on copy states `RAW_ZONES`, `GROUP_DUNGEONS`, `PUBLIC_DUNGEONS`, `MAIN_QUESTS` and `TUTORIALS` in one 8,730-byte file. The landed modules state the same domain under `akasha/temper/temper-player-completion/skill-point-*-sources/`. The two are keyed identically: the zone keys `AD1`, `DC0b` and `EP0a` occur nine times in the add-on copy and three times in `skill-point-zone-sources.module.code.ts`. The add-on does not import the landed modules; it carries its own table, which is why a name-level cross-grep of the add-on against `temper-player-completion` returns nothing and the duplication does not show as a collision. Nothing reads the add-on copy from outside the add-on, so declining to recreate it costs no caller. The recreation reaches the table through `@akasha/temper-skill-point-finder/sources` instead, whose `skill-point-sources` module holds the same 8,730 bytes. The `skill-point-*-sources` modules under `temper-player-completion` carry only `key`, `label`, `maxQuests` and `maxSkyshards`, and none of the quest, zone or achievement ids `computeSkillPoints` reads, so it cannot be written against them. `characters-skill-points` now imports `RAW_ZONES` and `GROUP_DUNGEONS` from that subpath rather than restating either.",
} as const satisfies Finding
