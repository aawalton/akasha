import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const errorUserAgent = {
  id: "01a05f3f-e3e0-7e41-90e7-af904c25308e",
  type: "page-type/text-property",
  slug: "error-user-agent",
  propertySlug: "user-agent",
  definition: "the browser or shell that reported an error",
  maxLength: 1024,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A report raised by a server names the server rather than a browser.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T23:13:37.760Z",
  updatedAt: "2026-09-24T23:22:29.000Z",
} as const satisfies TextProperty
