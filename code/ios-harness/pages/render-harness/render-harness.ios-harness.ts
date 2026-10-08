import type { IosHarness } from "akasha/code/ios-harness/ios-harness.page-type.types.ts"

export const renderHarness = {
  id: "01a059a0-c8c2-7f6f-b822-ad3dedaaeb86",
  type: "page-type/ios-harness",
  slug: "render-harness",
  definition: "the program that draws an app's tiles on a simulator",
  main: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which components the harness compiles is read from the app the harness is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An app naming no components draws nothing.",
    },
  ],
  createdAt: "2026-08-31T21:01:44.514Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies IosHarness
