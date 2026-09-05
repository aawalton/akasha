import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type BuildScript = Slug

export const buildScript = {
  id: "01a059b5-9616-700c-8d3b-e1a440b57051",
  pageTypeSlug: "relation-property",
  slug: "build-script",
  propertySlug: "build-script",
  definition: "the script that builds an app",
  targetPageTypeSlug: "page-type/shell-script",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An app stating no build script is not built by any command.",
    },
    {
      invariantKind: "departure",
      statement: "Which script builds an app is read from its page rather than walked to.",
    },
  ],
} as const satisfies RelationProperty
