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
  ],
} as const satisfies Initiative
