import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const iosHarness = {
  id: "01a0584d-22a8-7eb5-83f8-e9912fd9297c",
  type: "page-type/page-type",
  slug: "ios-harness",
  definition: "code drawing an iOS component for a look",
  parts: [
    "ios-harness/render-harness",
    "ios-harness/render-harness-cases",
    "ios-harness/render-harness-cases-categorize",
    "ios-harness/render-harness-cases-cost",
    "ios-harness/render-harness-cases-safety",
    "ios-harness/render-harness-cases-surplus",
    "ios-harness/render-harness-cases-wide",
    "ios-harness/render-harness-families",
    "ios-harness/render-harness-rendering",
    "ios-harness/render-harness-views",
    "shell-script/render-harness-run",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "code-file-property/swift", required: false, many: false },
    { pageProperty: "code-file-property/main", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness's Swift is in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness's top level statements sit in the file named main.swift.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A harness is never built into an app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A harness compiles the components the harness draws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The agent that changed the drawing looks at the image the harness drew.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No blessed image exists to be compared against.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
