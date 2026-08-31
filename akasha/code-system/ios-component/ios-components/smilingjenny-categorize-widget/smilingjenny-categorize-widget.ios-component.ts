import type { IosComponent } from "../../ios-component.page-type.ts"

export const smilingjennyCategorizeWidget = {
  id: "01a05835-69dd-7f14-b49e-39b86f2cb6ab",
  pageTypeSlug: "ios-component",
  slug: "smilingjenny-categorize-widget",
  definition: "Jenny's tile for how many transactions are unreviewed",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file carries the bundle Jenny's widget extension starts at.",
    },
  ],
} as const satisfies IosComponent
