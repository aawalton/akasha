import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const journalControls = {
  id: "01a0617d-544f-7967-a1b8-c193328aa344",
  type: "page-type/eso-interface",
  slug: "journal-controls",
  definition: "the fonts, labels and tooltip sections drawing the journal window",
  markup: "xml",
  loadedAs: "Controls.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The XML loads before the Lua bundle.",
    },
  ],
  createdAt: "2026-09-02T09:39:58.671Z",
  updatedAt: "2026-09-22T13:45:15.000Z",
} as const satisfies EsoInterface
