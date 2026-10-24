import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const scheme = {
  id: "01a16fce-01a9-77c2-be47-524e47ddf6b2",
  type: "page-type/select-property",
  slug: "scheme",
  propertySlug: "scheme",
  definition: "the color scheme a person reads in",
  values: ["dark", "light", "system"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person stating no scheme reads in the dark scheme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person whose scheme is system reads in the scheme each device prefers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person writes only the scheme on their own page from the settings page.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T21:25:34.247Z",
  updatedAt: "2026-10-24T21:25:34.247Z",
} as const satisfies SelectProperty
