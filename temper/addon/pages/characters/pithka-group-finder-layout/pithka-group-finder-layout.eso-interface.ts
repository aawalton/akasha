import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const pithkaGroupFinderLayout = {
  id: "01a0dea5-6b22-7451-9153-899d8dba0685",
  type: "page-type/eso-interface",
  slug: "pithka-group-finder-layout",
  definition: "the group finder window and the listing card each group it finds is drawn in",
  markup: "xml",
  loadedAs: "TemperCharactersPithkaGroupFinder.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The markup is Pithka's Achievement Tracker's own, with only its global names renamed.",
    },
  ],
} as const satisfies EsoInterface
