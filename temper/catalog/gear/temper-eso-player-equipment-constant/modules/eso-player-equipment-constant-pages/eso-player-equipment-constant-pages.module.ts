import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const esoPlayerEquipmentConstantPages = {
  id: "01a0d62c-4624-7bf3-b478-830ca19d8e09",
  type: "page-type/module",
  slug: "eso-player-equipment-constant-pages",
  definition: "every player equipment constant page, in order of its family and then its place",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are imported rather than read, so a browser holds them as well.",
    },
  ],
} as const satisfies Module
