import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const keptBy = {
  id: "01a0657d-b91d-7200-a73d-8b8122726299",
  type: "page-type/text-property",
  slug: "kept-by",
  propertySlug: "kept-by",
  definition: "what a book record is kept by",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A record a command writes names the command.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A record naming no keeper of its own names no keeper here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:18:53.341Z",
  updatedAt: "2026-10-30T14:53:13.781Z",
} as const satisfies TextProperty
