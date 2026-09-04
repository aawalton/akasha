import type { PageType } from "@akasha/pages-system/page-type"
import type { RelationshipLevel } from "../closeness-levels/properties/relationship-level.number-property.ts"
import type { PersonaImage } from "../persona-images/persona-image.page-type.ts"

export type PersonaCoverImage = PersonaImage & {
  relationshipLevel: RelationshipLevel
}

export const personaCoverImage = {
  id: "01a0655b-4a9b-700b-a9cc-a60c8e139737",
  pageTypeSlug: "page-type",
  slug: "persona-cover-image",
  definition: "the picture a persona is shown by at a rung of closeness",
  pluralSlug: "persona-cover-images",
  extendsSlug: "page-type/persona-image",
  partSlugs: ["number-property/relationship-level"],
  properties: [{ pagePropertySlug: "relationship-level", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cover is matched by the persona and the rung together.",
    },
    {
      invariantKind: "departure",
      statement: "A cover naming no path is kept in the object store under its own identity.",
    },
  ],
} as const satisfies PageType
