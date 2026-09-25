import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoCompanionEquipmentConstantPages = {
  id: "01a0d62f-91ec-7359-b3c6-02f07f883204",
  type: "page-type/module",
  slug: "eso-companion-equipment-constant-pages",
  definition: "every companion equipment constant page, in order of its kind and then its place",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are imported rather than read, so a browser holds them as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equip type no page numbers stops the code importing this from loading.",
    },
  ],
} as const satisfies Module
