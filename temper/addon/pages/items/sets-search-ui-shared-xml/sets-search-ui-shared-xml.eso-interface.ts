import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const setsSearchUiSharedXml = {
  id: "01a0618f-abe1-7489-996e-bbc414aca800",
  type: "page-type/eso-interface",
  slug: "sets-search-ui-shared-xml",
  definition: "the controls the set search window shares between keyboard and gamepad",
  markup: "xml",
  loadedAs: "SearchUI/TemperItemsCraftingSets_SearchUI_Shared.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A column header is one line, and each column is wide enough for its header.",
    },
  ],
  createdAt: "2026-09-02T10:00:00.737Z",
  updatedAt: "2026-10-18T19:40:06.697Z",
} as const satisfies EsoInterface
