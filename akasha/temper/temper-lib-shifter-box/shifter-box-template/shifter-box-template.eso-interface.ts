import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const shifterBoxTemplate = {
  id: "01a06187-364c-7851-b7ad-0cc5cdf2a05e",
  pageTypeSlug: "eso-interface",
  slug: "shifter-box-template",
  definition: "the XML template every control of a shifter box is built from",
  markup: "xml",
  loadedAs: "ShifterBox/ShifterBoxTemplate.xml",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A control is named after the shifter box the control belongs to.",
    },
    {
      invariantKind: "departure",
      statement: "This document is loaded before the Lua bundle.",
    },
  ],
} as const satisfies EsoInterface
