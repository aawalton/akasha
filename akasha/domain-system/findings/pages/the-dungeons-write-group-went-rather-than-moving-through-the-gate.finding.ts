import type { Finding } from "../finding.page-type.ts"

export const theDungeonsWriteGroupWentRatherThanMovingThroughTheGate = {
  id: "01a060a2-2a5a-7f07-96f0-de52a6a80fcd",
  pageTypeSlug: "finding",
  slug: "the-dungeons-write-group-went-rather-than-moving-through-the-gate",
  domainSlug: "domain/temper",
  claim:
    "temper/shared-foundation-misc-dungeons is torn down, and the generator's dungeon write group is deleted rather than routed through the akasha gate. The 58 dungeon pages and 3 quest-giver pages therefore drive no output, and akasha/temper/temper-dungeons/dungeon-data carries that data as hand-landed code. Regenerating the data from the pages is no longer a run anyone can make.",
  evidence:
    "A finding removed at `1ef8ded065` named the write as the one thing holding the teardown, and a-generator-whose-output-moved-into-akasha-lands-it-through-the-gate proposed `writingFor` as the answer. The tree took neither. Commit 0ba149a9f2 had already deleted the alchemy, classes and formula-framework write groups once each of those packages landed in akasha, so deletion was the settled shape by the time dungeons came up. Commit ec54b8e586 follows it: tools/lib/temper-addon-data/writes/dungeons.ts is deleted, TEMPER_DUNGEONS_OUTPUT_DIR leaves output-dirs.ts, and the package is gone.\n\nThe data was compared equal before any of that. Importing temper/shared-foundation-misc-dungeons/src/generated/temper-dungeons.generated.ts beside @akasha/temper-dungeons/dungeon-data and comparing as JSON answers equal on TEMPER_DUNGEONS and on TEMPER_QUEST_GIVERS, 58 rows and 3 either side.\n\nThe loop is what went, rather than the data. An edit to a dungeon page now reaches compiled addon code only when a person edits dungeon-data.module.code.ts to match, and no check compares the two. Four sibling packages carry the same gap after 0ba149a9f2, so a route through `writingFor` would close five at once rather than one.\n\naddon-data-pages.ts keeps loading dungeonPages and questGiverPages, and page-row-totals.ts keeps counting them, which is where the sibling teardown left its own page loads.",
} as const satisfies Finding
