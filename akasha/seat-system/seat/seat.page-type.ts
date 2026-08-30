import type { PersonaSlug } from "../../domain-system/initiative/properties/persona-slug.text-property.ts"
import type { Page } from "../../pages-system/page/page.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"

export type Seat = Page & {
  personaSlug: PersonaSlug
}

export const seat = {
  id: "01a05035-2609-7463-ba49-ccaf20f5c337",
  pageTypeSlug: "page-type",
  slug: "seat",
  definition: "a place an agent works from",
  pluralSlug: "seats",
  extendsSlug: "page-type/page",
  mortal: true,
  properties: [{ pagePropertySlug: "persona-slug", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat's attributes can be re-stated without making it another seat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A persona holds more than one seat, so a seat is not reached by naming a persona.",
    },
  ],
} as const satisfies PageType
