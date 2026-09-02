import type { Module } from "../../code-system/modules/module.page-type.ts"

export const userId = {
  id: "01a05c6d-350a-7c37-b99c-21e66aabeaa5",
  pageTypeSlug: "module",
  slug: "user-id",
  definition: "the user a process acts as, taken from the environment or defaulted",
  code: "ts",
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "Alan's own id stands here as the default.",
    },
  ],
} as const satisfies Module
