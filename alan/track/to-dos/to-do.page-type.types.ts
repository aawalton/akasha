import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { Difficulty } from "./properties/difficulty.select-property.ts"
import type { DueTime } from "./properties/due-time.text-property.ts"
import type { Link } from "./properties/link.url-property.ts"
import type { ToDoAnchoredFromCompletion } from "./properties/to-do-anchored-from-completion.boolean-property.ts"
import type { ToDoCategory } from "./properties/to-do-category.select-property.ts"
import type { ToDoCompletedAt } from "./properties/to-do-completed-at.instant-property.ts"
import type { ToDoDueDate } from "./properties/to-do-due-date.calendar-date-property.ts"
import type { ToDoLastCompletedAt } from "./properties/to-do-last-completed-at.instant-property.ts"
import type { ToDoPriority } from "./properties/to-do-priority.select-property.ts"
import type { ToDoRecurrence } from "./properties/to-do-recurrence.text-property.ts"
import type { ToDoSortOrder } from "./properties/to-do-sort-order.number-property.ts"
import type { ToDoValue } from "./properties/to-do-value.relation-property.ts"
import type { WhatItTakes } from "./properties/what-it-takes.file-property.ts"

export type ToDo = Page & {
  title: Title
  toDoAnchoredFromCompletion?: ToDoAnchoredFromCompletion
  toDoCategory?: ToDoCategory
  difficulty?: Difficulty
  toDoDueDate?: ToDoDueDate
  dueTime?: DueTime
  link?: Link
  toDoPriority: ToDoPriority
  toDoRecurrence?: ToDoRecurrence
  toDoSortOrder?: ToDoSortOrder
  toDoValue?: ToDoValue
  toDoLastCompletedAt?: ToDoLastCompletedAt
  toDoCompletedAt?: ToDoCompletedAt
  whatItTakes?: WhatItTakes
}
