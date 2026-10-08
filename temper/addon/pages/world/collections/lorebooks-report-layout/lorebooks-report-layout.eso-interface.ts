import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const lorebooksReportLayout = {
  id: "01a0624c-a660-70e7-ac40-0ff60904655d",
  type: "page-type/eso-interface",
  slug: "lorebooks-report-layout",
  definition: "the lore library search box and the two report windows the lorebook tracker fills",
  markup: "xml",
  loadedAs: "TemperWorldLoreBooks.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The search box takes its placeholder and its label from a string id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every row of a report is a virtual label the tracker copies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Shalidor heading and the Eidetic heading are anchored to the one scroll child.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The copy window has one edit box the player reads rather than writes.",
    },
  ],
  createdAt: "2026-09-02T13:26:25.632Z",
  updatedAt: "2026-09-22T09:41:14.000Z",
} as const satisfies EsoInterface
