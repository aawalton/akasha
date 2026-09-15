import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const promoteKeeps = {
  id: "01a06863-74eb-7fce-8275-9b6074382cb4",
  type: "module",
  slug: "promote-keeps",
  definition: "one run bringing the backup store's keep markings to what the windows say",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every marking made is read back off the backup store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A marking the backup store did not take is reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding any disagreement fails once every action has been tried.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Importing the module starts nothing.",
    },
  ],
} as const satisfies Module
