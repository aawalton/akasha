import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ClaudeCodeSessionUuid = string

export const claudeCodeSessionUuid = {
  id: "01a053e4-cf4a-7e0c-a936-1a0a62a7b7e5",
  pageTypeSlug: "text-property",
  slug: "claude-code-session-uuid",
  propertySlug: "claude-code-session-uuid",
  definition: "the session an agent in a seat is answering in",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat is answering in one session at a time, and the session it answered in before is not kept.",
    },
  ],
} as const satisfies TextProperty
