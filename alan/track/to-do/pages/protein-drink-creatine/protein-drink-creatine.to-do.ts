import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const proteinDrinkCreatine = {
  id: "019f0091-bc70-79e9-9315-ab68c93fc301",
  type: "page-type/to-do",
  slug: "protein-drink-creatine",
  title: "Protein drink + creatine",
  toDoCategory: "health",
  difficulty: "trivial",
  toDoDueDate: "2026-10-18",
  priority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-15T14:00:26.692Z",
  whatItTakes: "txt",
  createdAt: "2026-06-25T20:56:18.800Z",
  updatedAt: "2026-10-18T10:05:01.821Z",
} as const satisfies ToDo
