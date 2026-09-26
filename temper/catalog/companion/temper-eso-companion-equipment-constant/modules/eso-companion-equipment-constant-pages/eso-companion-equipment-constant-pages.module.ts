import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoCompanionEquipmentConstantPages = {
  id: "01a0d62f-91ec-7359-b3c6-02f07f883204",
  type: "page-type/module",
  slug: "eso-companion-equipment-constant-pages",
  definition: "the companion equipment constants, read from the pages that hold them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A constant is read from its page as the companion catalogue holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An equip type no page numbers is refused where it is asked for.",
    },
  ],
} as const satisfies Module
