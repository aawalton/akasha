import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const secretResource = {
  id: "01a08cfa-dafb-7b31-884e-718e64f5308b",
  type: "page-type/text-property",
  slug: "secret-resource",
  propertySlug: "secret-resource",
  definition: "the cluster resource holding a web app's secret values",
  maxLength: 253,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The resource is named on the page rather than written into the code reaching for its values.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A web app's secret values are the values the secret pages place in this resource.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two web apps may name one resource.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
