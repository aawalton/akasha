import type { NumberProperty } from "@akasha/pages/number-property"

export type MaxLength = number

export const maxLength = {
  id: "01a0780a-4fc5-7ef6-8dbb-c783a3f64f6b",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "max-length",
  propertySlug: "max-length",
  definition: "the most one value may run to, in characters",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A declaration narrows the length its property states by stating a shorter length.",
    },
    {
      invariantKind: "departure",
      statement: "A list holds each entry to the length rather than the entries together.",
    },
  ],
} as const satisfies NumberProperty
