import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ManifestSlug = Slug

export const manifestSlug = {
  id: "01a07317-ae51-7f69-a24e-d94859315637",
  pageTypeSlug: "relation-property",
  slug: "manifest-slug",
  propertySlug: "manifest-slug",
  definition: "the manifest a cluster service is applied as",
  targetPageTypeSlug: "page-type/manifest",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifest is named by its slug rather than by the path its code sits at.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest page claims the code file, so the index answers for that file.",
    },
  ],
} as const satisfies RelationProperty
