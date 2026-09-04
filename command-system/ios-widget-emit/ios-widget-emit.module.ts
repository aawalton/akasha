import type { Module } from "../../code-system/modules/module.page-type.ts"

export const iosWidgetEmit = {
  id: "01a069f1-8def-708e-8119-d023bf9ed009",
  pageTypeSlug: "module",
  slug: "ios-widget-emit",
  definition: "one widget's Swift written out and set against the Swift already standing",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The command is spawned as a program rather than imported.",
    },
    {
      invariantKind: "departure",
      statement: "A widget the pages do not name reaches nothing.",
    },
  ],
} as const satisfies Module
