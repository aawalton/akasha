import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const siteDocumentPublic = {
  id: "01a0e330-5efd-7286-8602-61d0859a5b89",
  type: "page-type/boolean-property",
  slug: "site-document-public",
  propertySlug: "public",
  definition: "whether a reader who has not signed in reaches a site document's path",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A site document stating no value here is reached only by a signed-in reader.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
