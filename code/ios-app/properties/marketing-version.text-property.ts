import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const marketingVersion = {
  id: "01a05f96-1925-7984-9108-b4d5346476fc",
  type: "page-type/text-property",
  slug: "marketing-version",
  propertySlug: "marketing-version",
  definition: "the version of an app a person reads on the App Store",
  maxLength: 20,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A version is up to three numbers parted by dots.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version is unchanged by an upload.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build gives an app the version its page states.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T00:47:47.493Z",
  updatedAt: "2026-09-24T22:21:00.000Z",
} as const satisfies TextProperty
