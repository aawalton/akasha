import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const shifterBoxTemplate = {
  id: "01a06187-364c-7851-b7ad-0cc5cdf2a05e",
  type: "page-type/eso-interface",
  slug: "shifter-box-template",
  definition: "the XML template building every control of a shifter box",
  markup: "xml",
  loadedAs: "XML/TemperShifterBox.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A control is named after the shifter box the control belongs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This document is loaded before the Lua bundle.",
    },
  ],
  createdAt: "2026-09-02T09:50:46.348Z",
  updatedAt: "2026-09-22T13:54:21.000Z",
} as const satisfies EsoInterface
