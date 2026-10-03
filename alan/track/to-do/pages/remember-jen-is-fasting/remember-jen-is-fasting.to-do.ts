import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const rememberJenIsFasting = {
  id: "019db533-f381-7d79-bdb7-cffbef47d403",
  type: "page-type/to-do",
  slug: "remember-jen-is-fasting",
  title: "Remember Jen is fasting",
  toDoCategory: "love",
  toDoDueDate: "2026-11-01",
  priority: "p2",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=1SU",
  toDoSortOrder: 18,
  toDoValue: "value/love",
  toDoLastCompletedAt: "2026-10-03T14:42:57.655Z",
} as const satisfies ToDo
