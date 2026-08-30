import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { Swift } from "./properties/swift.file-property.ts"

export type IosComponent = Domain & {
  swift: Swift
}

export const iosComponent = {
  id: "01a05472-ab84-78cc-8758-9f95622d1b04",
  pageTypeSlug: "page-type",
  slug: "ios-component",
  definition: "code an iOS app is built from",
  pluralSlug: "ios-components",
  partSlugs: [
    "ios-component/categorize-ring",
    "ios-component/ring",
    "ios-component/safety-ring",
    "ios-component/surplus-ring",
    "ios-component/tier",
    "file-property/swift",
  ],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "swift", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An iOS component's Swift is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is imported.",
    },
    {
      invariantKind: "departure",
      statement: "Xcode compiles it.",
    },
    {
      invariantKind: "stopgap",
      statement: "The ring components also stand under ios-widget/ring.",
    },
  ],
} as const satisfies PageType
