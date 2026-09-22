import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonFieldRegistry = {
  id: "01a061c5-18dd-7004-88c4-037542b656a5",
  type: "page-type/module",
  slug: "hud-addon-field-registry",
  definition: "the fields the bar shows, kept in the order the bar draws the fields in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field registered twice under one id replaces the earlier field in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two fields of one order keep the order the two fields were registered in.",
    },
  ],
} as const satisfies Module
