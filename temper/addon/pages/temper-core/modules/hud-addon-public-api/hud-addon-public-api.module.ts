import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonPublicApi = {
  id: "01a061c5-18dd-700f-96b2-7a0b4a1f8e37",
  type: "page-type/module",
  slug: "hud-addon-public-api",
  definition: "the global opening the bar, the commands and the hiding to another add-on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The global is published as the module is loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape of the global is stated in `temper-addon-type`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another add-on reaches the heads-up add-on through the global alone.",
    },
  ],
} as const satisfies Module
