import type { Module } from "@akasha/code-system/module"

export const housingAddonNames = {
  id: "01a06113-b7cc-7d40-b7b2-0b20ea198305",
  pageTypeSlug: "module",
  slug: "housing-addon-names",
  definition: "the name and version the housing add-on answers to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name here is the folder name the game loads.",
    },
  ],
} as const satisfies Module
