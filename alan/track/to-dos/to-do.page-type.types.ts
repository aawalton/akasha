import type { Difficulty } from "akasha/alan/track/to-dos/properties/difficulty.select-property.types.ts"
import type { DueTime } from "akasha/alan/track/to-dos/properties/due-time.text-property.ts"
import type { Link } from "akasha/alan/track/to-dos/properties/link.url-property.types.ts"
import type { ToDoAnchoredFromCompletion } from "akasha/alan/track/to-dos/properties/to-do-anchored-from-completion.boolean-property.types.ts"
import type { ToDoCategory } from "akasha/alan/track/to-dos/properties/to-do-category.select-property.types.ts"
import type { ToDoCompletedAt } from "akasha/alan/track/to-dos/properties/to-do-completed-at.instant-property.types.ts"
import type { ToDoDueDate } from "akasha/alan/track/to-dos/properties/to-do-due-date.calendar-date-property.types.ts"
import type { ToDoLastCompletedAt } from "akasha/alan/track/to-dos/properties/to-do-last-completed-at.instant-property.types.ts"
import type { ToDoPriority } from "akasha/alan/track/to-dos/properties/to-do-priority.select-property.types.ts"
import type { ToDoRecurrence } from "akasha/alan/track/to-dos/properties/to-do-recurrence.text-property.ts"
import type { ToDoSortOrder } from "akasha/alan/track/to-dos/properties/to-do-sort-order.number-property.types.ts"
import type { ToDoValue } from "akasha/alan/track/to-dos/properties/to-do-value.relation-property.types.ts"
import type { WhatItTakes } from "akasha/alan/track/to-dos/properties/what-it-takes.file-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"

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
