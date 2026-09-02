import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionUiTypes = {
  id: "01a06121-f0d6-7727-b05d-aa9ca5f7c0f6",
  pageTypeSlug: "module",
  slug: "completion-ui-types",
  definition: "the shapes the completion window shows one player's progress in",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
