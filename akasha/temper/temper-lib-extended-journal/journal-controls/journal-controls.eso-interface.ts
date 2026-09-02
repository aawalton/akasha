import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const journalControls = {
  id: "01a0617d-544f-7967-a1b8-c193328aa344",
  pageTypeSlug: "eso-interface",
  slug: "journal-controls",
  definition: "the fonts, labels and tooltip sections the journal window is drawn from",
  markup: "xml",
  loadedAs: "Controls.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The XML loads before the Lua bundle.",
    },
  ],
} as const satisfies EsoInterface
