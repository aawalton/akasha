import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const runs = {
  id: "01a05a3f-b42b-7564-ba54-a63a51342f27",
  type: "text-property",
  slug: "runs",
  propertySlug: "runs",
  definition: "a command line a service starts",
  maxLength: 500,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The command line names a program on the host and the words handed to it.",
    },
    {
      invariantKind: "absence",
      statement: "No file of this repository is named here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
