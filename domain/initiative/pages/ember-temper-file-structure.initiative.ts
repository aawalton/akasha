import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const emberTemperFileStructure = {
  id: "01a0c42f-d2b3-7ff3-8631-e90165180be9",
  type: "page-type/initiative",
  slug: "ember-temper-file-structure",
  domain: "domain/temper",
  persona: "persona/ember",
  intentStack: [
    {
      statement:
        "Every add-on temper ships is named for the branch it sits under rather than for the kind it is.",
      workingMemory:
        "Not met. Twenty eso-addon pages and one domain still read `temper-<what>-addon`, so nothing strips and each folder keeps its whole name. Named `temper-addon-<what>`, the folder is `<what>` and every path beneath it loses the rest. Path length is not cosmetic here: three modules have crossed the 15,000 byte ceiling on a move because their own imports grew, and two had to be divided. The in-game name is the manifest's `name`, not the slug, so a rename reaches no saved variables.",
    },
    {
      statement:
        "The page type an add-on is sits in temper, and every add-on temper ships is a page of it.",
      workingMemory:
        "Not met. The page type is `eso-addon`, defined at `temper/addon/`, and `temper-addon` is a domain at `temper/addon/`. All 48 eso-addon pages in the repository are temper's, so nothing outside temper reads that page type. A page type carries one `pages` folder, so it is unsettled whether the 26 library add-ons share it with the 20 the player runs, or the library becomes a page type of its own.",
    },
  ],
} as const satisfies Initiative
