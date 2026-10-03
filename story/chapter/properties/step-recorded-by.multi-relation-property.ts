import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const stepRecordedBy = {
  id: "01a0e058-679f-70f6-baaf-b82f0c8a4690",
  type: "page-type/multi-relation-property",
  slug: "step-recorded-by",
  propertySlug: "recorded-by",
  definition: "the story recorders that have drafted what a turn or a written chapter changed",
  targetPageType: "page-type/story-recorder",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recorder is named here once it advances the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A recorder named here runs on the turn again only after the game master's advance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master's advance clears this list, so every recorder runs on a rerun.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
