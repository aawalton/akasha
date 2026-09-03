import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const equipmentKit = {
  id: "01a0685e-89d5-7950-b5e5-a254ed540aed",
  pageTypeSlug: "module",
  slug: "equipment-kit",
  definition: "whether the kit a movement asks for is kit Alan has to hand",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movement asking for no implement is always in the kit.",
    },
    {
      invariantKind: "departure",
      statement: "A movement stating no kit asks for no implement.",
    },
    {
      invariantKind: "departure",
      statement: "Kit standing for no equipment category is out of the kit.",
    },
    {
      invariantKind: "absence",
      statement: "The equipment values are already slugs, so nothing is slugged here.",
    },
  ],
} as const satisfies Module
