import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorTypes = {
  id: "01a060b8-08c5-704c-a98f-25bae2ac07e7",
  type: "page-type/module",
  slug: "armor-types",
  definition: "the armor pieces and the shield taking an armor trait or enchantment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The armor types, their armor share and glyph share are read from their pages.",
    },
  ],
} as const satisfies Module
