import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const sessionSlug = {
  id: "01a06580-66fd-7412-a20a-d678614e0121",
  type: "text-property",
  slug: "session-slug",
  propertySlug: "session-slug",
  definition: "the bout of training the set belonged to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A bout is the run of sets Alan performed at one sitting.",
    },
    {
      invariantKind: "departure",
      statement: "Two sets of one day naming two bouts were performed at two sittings.",
    },
    {
      invariantKind: "absence",
      statement: "A bout is no page.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
