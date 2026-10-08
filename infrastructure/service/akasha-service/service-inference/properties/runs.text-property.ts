import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const runs = {
  id: "01a05a3f-b42b-7564-ba54-a63a51342f27",
  type: "page-type/text-property",
  slug: "runs",
  propertySlug: "runs",
  definition: "a command line a service starts",
  maxLength: 500,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The command line names a program on the host and the words handed to it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No file of this repository is named here.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-31T23:55:19.467Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies TextProperty
