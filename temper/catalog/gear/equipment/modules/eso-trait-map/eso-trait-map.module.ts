import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoTraitMap = {
  id: "01a0610f-45ba-79d3-b258-2e9d709283b7",
  type: "page-type/module",
  slug: "eso-trait-map",
  definition: "which temper trait a numbered Elder Scrolls Online trait answers to, on the web",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Weapon armor and jewelry each number their traits differently.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player trait is answered from the held trait map pages, a companion one after.",
    },
  ],
} as const satisfies Module
