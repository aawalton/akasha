import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const skillPointFinderLayout = {
  id: "01a062e8-bed7-7011-a36b-31903e5d6972",
  type: "page-type/eso-interface",
  slug: "skill-point-finder-layout",
  definition: "the window, table rows and tooltips the skill point finder draws",
  markup: "xml",
  loadedAs: "TemperCharactersSkillPointFinder.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The markup loads after the compiled Lua bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name in a row keeps to one line and ends in an ellipsis where it runs long.",
    },
  ],
  createdAt: "2026-09-02T16:16:55.511Z",
  updatedAt: "2026-10-18T19:10:27.141Z",
} as const satisfies EsoInterface
