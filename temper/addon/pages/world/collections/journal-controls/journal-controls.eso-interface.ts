import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const journalControls = {
  id: "01a0617d-544f-7967-a1b8-c193328aa344",
  type: "page-type/eso-interface",
  slug: "journal-controls",
  definition: "the fonts, labels and tooltip sections the journal window is drawn from",
  markup: "xml",
  loadedAs: "Controls.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The XML loads before the Lua bundle.",
    },
  ],
} as const satisfies EsoInterface
