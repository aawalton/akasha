import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const stepMechanicsIssues = {
  id: "01a10256-8b7b-7c91-8267-12c18a468096",
  type: "page-type/text-property",
  slug: "step-mechanics-issues",
  propertySlug: "mechanics-issues",
  definition: "one reason the mechanics step found a beat of a turn or written chapter cannot work",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An issue names the beat it faults by number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master mends the beats each issue faults, and its advance clears them.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
