import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const appLayoutLoading = {
  id: "01a0655e-d39b-7415-b913-3146ff8bfa28",
  type: "module",
  slug: "app-layout-loading",
  definition: "what the signed-in layout loads before it is drawn",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The layout loads the nav items rather than the shell fetching those items first.",
    },
    {
      invariantKind: "departure",
      statement: "The sidebar is drawn on the first frame rather than after hydration.",
    },
  ],
} as const satisfies Module
