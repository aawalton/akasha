import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const claudeCodeSessionUuid = {
  id: "01a053e4-cf4a-7e0c-a936-1a0a62a7b7e5",
  type: "page-type/text-property",
  slug: "claude-code-session-uuid",
  propertySlug: "claude-code-session-uuid",
  definition: "the id of the session of an agent in a seat",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The session the seat answered in before is not kept.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T18:18:19.338Z",
  updatedAt: "2026-09-25T17:57:26.000Z",
} as const satisfies TextProperty
