import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lostTreasureNotifications = {
  id: "01a06141-8008-77a8-af65-98ebdb893c22",
  pageTypeSlug: "module",
  slug: "lost-treasure-notifications",
  definition: "an offer to report a new dig site, shown in the notification list",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A notification is offered in three languages alone.",
    },
  ],
} as const satisfies Module
