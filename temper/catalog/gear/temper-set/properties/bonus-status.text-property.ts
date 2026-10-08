import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const bonusStatus = {
  id: "01a05fd1-d437-73eb-b682-b54edb64a96b",
  type: "page-type/text-property",
  slug: "bonus-status",
  propertySlug: "status",
  definition: "how far temper models what a set bonus does",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus marked unsupported moves no metric temper counts.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:53:02.007Z",
  updatedAt: "2026-09-21T15:28:58.000Z",
} as const satisfies TextProperty
