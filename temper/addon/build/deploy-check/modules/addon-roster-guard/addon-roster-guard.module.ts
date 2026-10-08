import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonRosterGuard = {
  id: "01a06287-7841-7049-814e-e0e562320460",
  type: "page-type/module",
  slug: "addon-roster-guard",
  definition: "whether the add-on roster a scan would run over has nothing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A scan over an empty roster reports clean without having looked at anything.",
    },
  ],
  createdAt: "2026-09-02T14:30:40.449Z",
  updatedAt: "2026-09-21T22:03:34.000Z",
} as const satisfies Module
