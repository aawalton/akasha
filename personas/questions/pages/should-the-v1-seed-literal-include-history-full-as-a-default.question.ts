import type { Question } from "../question.page-type.ts"

export const shouldTheV1SeedLiteralIncludeHistoryFullAsADefault = {
  id: "019f4c6e-1a37-7cfb-a590-9c7c46fd9dbe",
  pageTypeSlug: "question",
  slug: "should-the-v1-seed-literal-include-history-full-as-a-default",
  ask: "Should the v1 seed literal include `history:'full'` as a default, or does the continuous-scroll default live elsewhere?",
  askedBy: "awen",
  askedIn: "019f32f0-31d0-7f04-9d42-37b08cfb7fe8",
  status: "dismissed",
} as const satisfies Question
