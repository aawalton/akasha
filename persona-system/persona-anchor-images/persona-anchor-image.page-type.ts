import type { PageType } from "@akasha/pages-system/page-type"
import type { PersonaImage } from "../persona-images/persona-image.page-type.ts"
import type { Grade } from "./properties/grade.text-property.ts"

export type PersonaAnchorImage = PersonaImage & {
  grade?: Grade
}

export const personaAnchorImage = {
  id: "01a0655b-4a9b-700a-b7af-04be2a9c0df4",
  pageTypeSlug: "page-type",
  slug: "persona-anchor-image",
  definition: "the picture every other picture of a persona is drawn to match",
  pluralSlug: "persona-anchor-images",
  extendsSlug: ["page-type/persona-image"],
  partSlugs: ["text-property/grade"],
  properties: [{ pagePropertySlug: "grade", required: false, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An anchor is matched by the persona alone.",
    },
    {
      invariantKind: "departure",
      statement: "A persona has one anchor.",
    },
  ],
} as const satisfies PageType
