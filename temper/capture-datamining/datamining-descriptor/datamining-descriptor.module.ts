import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const dataminingDescriptor = {
  id: "01a0608a-15b1-7b7c-a207-279aad7165d2",
  type: "module",
  slug: "datamining-descriptor",
  definition: "the name, version and defaults the mining add-on hands the game to save under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game saves the add-on under the name `TemperDataMining_SavedVariables`.",
    },
    {
      invariantKind: "departure",
      statement: "The defaults name no field.",
    },
    {
      invariantKind: "departure",
      statement: "The sweep fills each field as the sweep runs.",
    },
    {
      invariantKind: "absence",
      statement: "No load time is kept.",
    },
  ],
} as const satisfies Module
