import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const serviceManifest = {
  id: "01a07317-ae51-7f69-a24e-d94859315637",
  type: "relation-property",
  slug: "service-manifest",
  propertySlug: "manifest",
  definition: "a manifest a service is applied as",
  targetPageType: "page-type/manifest",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The manifest is named by its slug rather than by the path its code sits at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The manifest page claims the code file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The index answers for the code file.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
