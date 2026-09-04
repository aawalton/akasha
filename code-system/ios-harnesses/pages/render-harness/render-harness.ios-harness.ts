import type { IosHarness } from "../../ios-harness.page-type.ts"

export const renderHarness = {
  id: "01a059a0-c8c2-7f6f-b822-ad3dedaaeb86",
  pageTypeSlug: "ios-harness",
  slug: "render-harness",
  definition: "the program that draws an app's tiles on a simulator",
  main: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which components the harness compiles is read from the app the harness is given.",
    },
    {
      invariantKind: "departure",
      statement: "An app naming no components draws nothing.",
    },
  ],
} as const satisfies IosHarness
