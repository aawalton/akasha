import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type ClaudeCodeSessionUuid = string

export const claudeCodeSessionUuid = {
  id: "01a05035-2609-75c3-913c-f82d69360fe0",
  pageTypeSlug: "text-property",
  slug: "claude-code-session-uuid",
  definition: "the session an agent in a seat is answering in",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
} as const satisfies TextProperty
