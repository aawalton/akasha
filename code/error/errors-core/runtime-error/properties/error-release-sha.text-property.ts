import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const errorReleaseSha = {
  id: "01a05f3f-e3e0-7d68-b1de-729068552c64",
  type: "page-type/text-property",
  slug: "error-release-sha",
  propertySlug: "release-sha",
  definition: "the build a client was running when a client met an error",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build the reporting client could not name is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build named is the build the first report had.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
