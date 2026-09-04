import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const promoteKeeps = {
  id: "01a06863-74eb-7fce-8275-9b6074382cb4",
  pageTypeSlug: "module",
  slug: "promote-keeps",
  definition: "one run bringing the backup store's keep markings to what the windows say",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every marking made is read back off the backup store.",
    },
    {
      invariantKind: "departure",
      statement: "A marking the backup store did not take is reported.",
    },
    {
      invariantKind: "departure",
      statement: "A run finding any disagreement fails once every action has been tried.",
    },
    {
      invariantKind: "absence",
      statement: "Importing the module starts nothing.",
    },
  ],
} as const satisfies Module
