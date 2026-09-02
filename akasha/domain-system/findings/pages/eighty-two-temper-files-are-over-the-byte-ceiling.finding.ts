import type { Finding } from "../finding.page-type.ts"

export const eightyTwoTemperFilesAreOverTheByteCeiling = {
  id: "01a06039-93e3-7741-8221-ad7a814fe323",
  pageTypeSlug: "finding",
  slug: "eighty-two-temper-files-are-over-the-byte-ceiling",
  domainSlug: "domain/temper",
  claim:
    "82 of the 4,484 files under `temper/` are over 15,000 bytes, 74 TypeScript and 8 XML. The largest is 1,362,516 bytes, ninety times the ceiling. 15 of the 82 are hand-written rather than generated, so splitting the generator is not the whole answer. game-navigation-addon alone carries 26 of them.",
  evidence:
    "Measuring every path `git ls-files temper` answers: 82 over 15,000 bytes, 74 `.ts` and 8 `.xml`. The ten largest are temper/game-characters-equipment/src/sets/generated/temper-set.generated.ts 1,362,516; temper/game-collections-addon/src/lorebooks/data/eidetic-book-data.ts 1,256,215; temper/player-completion/src/generated/collectibles-data.generated.ts 1,199,592; temper/game-characters-skills/src/generated/temper-skill.generated.ts 1,165,740; temper/shared-build-deploy-checks/src/eso-base-game-globals.generated.ts 788,312; temper/shared-addon-libraries-lib-sets/src/data/generated/set-data-preloaded.generated.ts 613,119; temper/player-completion/src/generated/zone-completion-data.generated.ts 562,930; temper/game-completion/src/generated/lore-library-data.generated.ts 438,494; temper/player-completion/src/generated/achievement-data.generated.ts 351,999; temper/shared-build-deploy-checks/src/eso-colon-methods.generated.ts 331,794. By package: game-navigation-addon 26, player-completion 8, game-crafting-addon 7, game-collections-addon 6, game-characters-capture-addon 4. The 8 XML are all interface layouts an addon loads, led by temper/game-combat-addon/metadata/TemperCombat.xml at 164,528 and temper/game-crafting-addon/metadata/XML/UI/CraftStore.xml at 59,060; an XML layout is one document the client reads whole, so halving one is not a refactor the client admits. The 7 largest hand-written offenders are lorebook and furnishing tables under game-collections-addon and game-crafting-addon.",
} as const satisfies Finding
