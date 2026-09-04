import type { ToDo } from "../../to-do.page-type.ts"

export const proteinDrinkCreatine = {
  id: "019f0091-bc70-79e9-9315-ab68c93fc301",
  pageTypeSlug: "to-do",
  slug: "protein-drink-creatine",
  title: "Protein drink + creatine",
  toDoCategory: "health",
  difficulty: "trivial",
  toDoDueDate: "2026-08-23",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoValueSlug: "health",
  whatItTakes: "txt",
} as const satisfies ToDo
