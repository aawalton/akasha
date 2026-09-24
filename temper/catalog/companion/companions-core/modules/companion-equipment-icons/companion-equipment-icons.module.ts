import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEquipmentIcons = {
  id: "01a06152-c2c7-72a3-af73-86de77280931",
  type: "page-type/module",
  slug: "companion-equipment-icons",
  definition: "icon url lookup for companion armor, jewelry, and weapon equipment",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Jewelry icons ignore quality apart from returning null for no-quality.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Icon paths follow the companions_u30_equipment naming scheme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A no-type weapon yields null rather than a placeholder icon.",
    },
  ],
} as const satisfies Module
