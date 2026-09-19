import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployAddonInstalling = {
  id: "01a090bd-a195-7917-b992-02729e839291",
  type: "page-type/module",
  slug: "deploy-addon-installing",
  definition: "one ESO addon compiled and put where the game reads it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon is named by the slug its page carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder an addon is built from is the folder its page sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name the game reads an addon by is the name that folder's manifest states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder no addon manifest sits in refuses the deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An addon is compiled before it is placed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compile that refuses leaves the game's folder as it was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the compile said is answered beside what the placing said.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is packed and nothing here leaves this machine.",
    },
  ],
} as const satisfies Module
