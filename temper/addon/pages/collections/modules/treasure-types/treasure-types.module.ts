import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasureTypes = {
  id: "01a061d5-d0b2-764d-ac02-736a57d1eacd",
  type: "page-type/module",
  slug: "treasure-types",
  definition: "the shapes a treasure pin and its lookups take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin is placed by where the pin falls on its own map rather than on the world.",
    },
  ],
} as const satisfies Module
