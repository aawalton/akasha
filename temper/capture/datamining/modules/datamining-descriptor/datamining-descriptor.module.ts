import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataminingDescriptor = {
  id: "01a0608a-15b1-7b7c-a207-279aad7165d2",
  type: "page-type/module",
  slug: "datamining-descriptor",
  definition: "the name, version and defaults the mining capture hands the game to save",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game saves the mined data under the name `TemperDataMining_SavedVariables`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The capture initializes once the game says the catalog add-on has loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The defaults name no field.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep fills each field as the sweep runs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No load time is kept.",
    },
  ],
} as const satisfies Module
