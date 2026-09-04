import type { Module } from "../../code-system/modules/module.page-type.ts"

export const globalErrorCapture = {
  id: "01a05c89-6034-7aa8-8022-17a7a37e61e3",
  pageTypeSlug: "module",
  slug: "global-error-capture",
  definition: "the window handlers turning an uncaught error or rejection into a report",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The handlers are installed once however often this is called.",
    },
  ],
} as const satisfies Module
