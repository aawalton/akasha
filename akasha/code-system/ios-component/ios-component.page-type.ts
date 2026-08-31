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
    "ios-component/alanwalton-categorize-widget",
    "ios-component/alanwalton-claude-usage-payload",
    "ios-component/alanwalton-claude-usage-view",
    "ios-component/alanwalton-claude-usage-widget",
    "ios-component/alanwalton-device-secret-reader",
    "ios-component/alanwalton-inbox-stoplights-widget",
    "ios-component/alanwalton-never-loaded-view",
    "ios-component/alanwalton-persona-stoplights-widget",
    "ios-component/alanwalton-refused-view",
    "ios-component/alanwalton-safety-level-widget",
    "ios-component/alanwalton-stoplight-ring",
    "ios-component/alanwalton-surplus-widget",
    "ios-component/alanwalton-upkeep-stoplights-widget",
    "ios-component/alanwalton-values-stoplights-widget",
    "ios-component/alanwalton-widget-feed",
    "ios-component/categorize-ring",
    "ios-component/ring",
    "ios-component/safety-ring",
    "ios-component/smilingjenny-categorize-view",
    "ios-component/smilingjenny-categorize-widget",
    "ios-component/smilingjenny-safety-level-widget",
    "ios-component/smilingjenny-surplus-widget",
    "ios-component/smilingjenny-widget-feed",
    "ios-component/spacing",
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
      invariantKind: "departure",
      statement: "A shell's seam copies the components an app names into the extension it builds.",
    },
  ],
} as const satisfies PageType
