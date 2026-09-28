import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const imageAlbums = {
  id: "01a0e947-5ee0-7880-974f-e21317180c28",
  type: "page-type/multi-relation-property",
  slug: "image-albums",
  propertySlug: "albums",
  definition: "the albums an image is in",
  targetPageType: "page-type/image-album",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An image states the albums it is in.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
