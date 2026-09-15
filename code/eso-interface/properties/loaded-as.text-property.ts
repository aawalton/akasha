import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loadedAs = {
  id: "01a061c5-760e-7c2b-8bed-7804c4b4226d",
  type: "page-type/text-property",
  slug: "loaded-as",
  propertySlug: "loaded-as",
  definition: "the name an addon's manifest loads this file by",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A name here is chosen outside akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name is stated rather than worked out from the page's slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name has the folders the game reads the file under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A manifest reaches one file by one name.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A manifest name matching no page refuses the build rather than being skipped.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
