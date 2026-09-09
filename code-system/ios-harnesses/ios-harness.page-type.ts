import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { Swift } from "../ios-components/properties/swift.code-file-property.ts"
import type { Main } from "../ios-programs/properties/main.code-file-property.ts"

export type IosHarness = Domain & {
  swift?: Swift
  main?: Main
}

export const iosHarness = {
  id: "01a0584d-22a8-7eb5-83f8-e9912fd9297c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ios-harness",
  definition: "code that draws an iOS component to be looked at",
  pluralSlug: "ios-harnesses",
  parts: [
    "ios-harness/render-harness",
    "ios-harness/render-harness-cases",
    "ios-harness/render-harness-cases-categorize",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "A harness's Swift is in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A harness's top level statements sit in the file named main.swift.",
    },
    {
      invariantKind: "absence",
      statement: "A harness is never built into an app.",
    },
    {
      invariantKind: "departure",
      statement: "A harness compiles the components the harness draws.",
    },
    {
      invariantKind: "departure",
      statement: "The agent that changed the drawing looks at the image the harness drew.",
    },
    {
      invariantKind: "absence",
      statement: "No blessed image exists to be compared against.",
    },
  ],
} as const satisfies PageType
