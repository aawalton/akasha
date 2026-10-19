import type { ModelFamily } from "akasha/agent/model/family/model-family.page-type.types.ts"

export const haiku = {
  id: "01a0535c-f2cf-7a81-8244-06707c1520b8",
  type: "page-type/model-family",
  slug: "haiku",
  definition: "Anthropic's least capable model family",
  name: "claude-haiku-4-5-20251001",
  createdAt: "2026-08-30T15:49:55.535Z",
  updatedAt: "2026-10-19T19:02:35.041Z",
} as const satisfies ModelFamily
