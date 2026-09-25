import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const navHref = {
  id: "01a0d8fc-03bb-7101-bbc0-3d78f194422f",
  type: "page-type/text-property",
  slug: "nav-href",
  propertySlug: "nav-href",
  definition: "where a nav item leads in place of its own page",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item leads to a path in its own app or to a whole web address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A whole web address opens as a site apart from the app.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
