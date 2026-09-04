import type { Module } from "../../code-system/modules/module.page-type.ts"

export const errorReporting = {
  id: "01a05c89-6034-7244-b9d2-6f9242df9ca4",
  pageTypeSlug: "module",
  slug: "error-reporting",
  definition: "a browser error posted to the sink, carrying the page it was seen on",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A report that fails to send raises nothing to the caller.",
    },
  ],
} as const satisfies Module
