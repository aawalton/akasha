import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveInstructor = {
  id: "01a0e9f0-a7e4-790a-bcc9-69b3c7898d0b",
  type: "page-type/world-title",
  slug: "super-supportive-instructor",
  title: "Instructor",
  world: "world/super-supportive",
  description: "The title for teachers.",
} as const satisfies WorldTitle
