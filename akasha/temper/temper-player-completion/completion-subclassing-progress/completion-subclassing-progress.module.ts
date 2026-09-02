import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionSubclassingProgress = {
  id: "01a0627d-aa45-7000-aa9b-9c58efaea8f2",
  pageTypeSlug: "module",
  slug: "completion-subclassing-progress",
  definition: "how far an account has taken the class skill lines subclassing lends out",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Only a skill line under the class heading is reckoned.",
    },
  ],
} as const satisfies Module
