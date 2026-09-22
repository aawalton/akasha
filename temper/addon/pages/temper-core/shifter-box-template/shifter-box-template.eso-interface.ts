import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const shifterBoxTemplate = {
  id: "01a06187-364c-7851-b7ad-0cc5cdf2a05e",
  type: "page-type/eso-interface",
  slug: "shifter-box-template",
  definition: "the XML template every control of a shifter box is built from",
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
} as const satisfies EsoInterface
