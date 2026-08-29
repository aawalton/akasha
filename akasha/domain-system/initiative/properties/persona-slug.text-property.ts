import type { TextProperty } from "../../../pages-system/page-property/text-property.page-type.ts"

export type PersonaSlug = string

export const personaSlug = {
  id: "01a04e58-5735-7549-8b6b-adb9d3ff999c",
  pageTypeSlug: "text-property",
  slug: "persona-slug",
  definition: "the persona an initiative belongs to",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "This holds text because no persona stands in the new system for a relation to reach.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a persona.",
    },
  ],
} as const satisfies TextProperty
