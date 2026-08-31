import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Swift } from "../ios-component/properties/swift.file-property.ts"

export type IosHarness = Domain & {
  swift: Swift
}

export const iosHarness = {
  id: "01a0584d-22a8-7eb5-83f8-e9912fd9297c",
  pageTypeSlug: "page-type",
  slug: "ios-harness",
  definition: "code that proves an iOS component",
  pluralSlug: "ios-harnesses",
  partSlugs: [
    "ios-harness/render-harness-cases",
    "ios-harness/render-harness-cases-categorize",
    "ios-harness/render-harness-cases-safety",
    "ios-harness/render-harness-cases-surplus",
    "ios-harness/render-harness-cases-wide",
    "ios-harness/render-harness-families",
    "ios-harness/render-harness-rendering",
    "ios-harness/render-harness-views",
  ],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "swift", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A harness's Swift is held in a file beside the page.",
    },
    {
      invariantKind: "absence",
      statement: "A harness is never built into an app.",
    },
    {
      invariantKind: "departure",
      statement: "A harness compiles the components it proves.",
    },
  ],
} as const satisfies PageType
