import type { ToDo } from "../../to-do.page-type.ts"

export const swapBathroomTowels = {
  id: "019db533-f381-7bd0-9260-24933db819eb",
  pageTypeSlug: "to-do",
  slug: "swap-bathroom-towels",
  title: "Swap bathroom towels",
  toDoCategory: "health",
  difficulty: "trivial",
  toDoDueDate: "2026-08-24",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 29,
  toDoValueSlug: "health",
} as const satisfies ToDo
