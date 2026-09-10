import type { IosComponent } from "../../ios-component.page-type.types.ts"

export const smilingjennyCategorizeWidget = {
  id: "01a05835-69dd-7f14-b49e-39b86f2cb6ab",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "smilingjenny-categorize-widget",
  definition: "Jenny's tile for how many transactions are unreviewed",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file has the bundle Jenny's widget extension starts at.",
    },
    {
      invariantKind: "constraint",
      statement: "Stating that start keeps this component out of the decode harness.",
    },
    {
      invariantKind: "gap",
      statement: "Jenny's categorize tile is compiled by a build to a device and by nothing else.",
    },
  ],
} as const satisfies IosComponent
