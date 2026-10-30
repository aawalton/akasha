import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const sessionSlug = {
  id: "01a06580-66fd-7412-a20a-d678614e0121",
  type: "page-type/text-property",
  slug: "session-slug",
  propertySlug: "session-slug",
  definition: "the workout a lifting set belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bout is the run of sets Alan performed at one sitting.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two sets of one day naming two bouts were performed at two sittings.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A bout is no page.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T04:21:48.925Z",
  updatedAt: "2026-10-30T16:52:25.798Z",
} as const satisfies TextProperty
