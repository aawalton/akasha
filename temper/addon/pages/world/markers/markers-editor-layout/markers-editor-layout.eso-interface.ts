import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const markersEditorLayout = {
  id: "01a0de85-2b4a-74ea-b9ea-0fc0ab458539",
  type: "page-type/eso-interface",
  slug: "markers-editor-layout",
  definition: "the profile editor window",
  markup: "xml",
  loadedAs: "TemperWorldMarkersEditor.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The editor sits on the game's default backdrop, in its keyboard fonts, fields and plain buttons.",
    },
  ],
  createdAt: "2026-09-26T16:21:04.458Z",
  updatedAt: "2026-10-18T19:30:11.883Z",
} as const satisfies EsoInterface
