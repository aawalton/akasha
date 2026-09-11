import type { Module } from "../../../../code-system/modules/module.page-type.types.ts"

export const signOutRoute = {
  id: "01a08e20-a545-7726-8e20-9238b6fd8a89",
  pageTypeSlug: "module",
  type: "module",
  slug: "sign-out-route",
  definition: "what ends a reader's session and where that reader is sent",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reader asking for the sign-out path without posting is sent to the root.",
    },
  ],
} as const satisfies Module
