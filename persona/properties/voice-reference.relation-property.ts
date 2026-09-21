import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const voiceReference = {
  id: "01a0c653-cf51-700d-8749-35ea7a65b757",
  type: "page-type/relation-property",
  slug: "voice-reference",
  propertySlug: "voice-reference",
  definition: "the recording a persona's voice was cloned from",
  targetPageType: "page-type/audio",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sound a voice was cloned from is a page rather than bytes under a key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A persona's voice sha256 opens the slug of the sound this names.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
