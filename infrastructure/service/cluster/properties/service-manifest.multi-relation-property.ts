import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const serviceManifest = {
  id: "01a07317-ae51-7f69-a24e-d94859315637",
  type: "page-type/multi-relation-property",
  slug: "service-manifest",
  propertySlug: "manifest",
  definition: "a manifest a service is applied as",
  targetPageType: "page-type/manifest",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest is named by its slug rather than by the path its code sits at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest page claims the code file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index answers for the code file.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
