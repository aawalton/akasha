import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonRosterGuard = {
  id: "01a06287-7841-7049-814e-e0e562320460",
  pageTypeSlug: "module",
  slug: "addon-roster-guard",
  definition: "whether the add-on roster a scan would run over holds nothing",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A scan over an empty roster reports clean without having looked at anything.",
    },
  ],
} as const satisfies Module
