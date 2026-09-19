import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const proteinDrinkCreatine = {
  id: "019f0091-bc70-79e9-9315-ab68c93fc301",
  type: "page-type/to-do",
  slug: "protein-drink-creatine",
  title: "Protein drink + creatine",
  toDoCategory: "health",
  difficulty: "trivial",
  toDoDueDate: "2026-09-20",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-19T17:39:24.495Z",
  whatItTakes: "txt",
} as const satisfies ToDo
