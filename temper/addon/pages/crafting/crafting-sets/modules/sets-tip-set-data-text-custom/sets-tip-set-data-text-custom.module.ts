import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipSetDataTextCustom = {
  id: "01a06231-8f1e-7a52-9a3f-a02b2b08ec4e",
  type: "page-type/module",
  slug: "sets-tip-set-data-text-custom",
  definition: "the player's own tooltip pattern filled in from the set's text parts",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A placeholder whose part is empty is cut out of the pattern along with its break.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The literal <br> in the pattern becomes a newline.",
    },
  ],
} as const satisfies Module
