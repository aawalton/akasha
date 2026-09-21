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
        "No global addon declaration starts with Lib, and every one is scoped to the addon declaring it.",
    },
  ],
} as const satisfies Initiative
