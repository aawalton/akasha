import type { Difficulty } from "akasha/alan/track/to-do/properties/difficulty.select-property.types.ts"
import type { DueTime } from "akasha/alan/track/to-do/properties/due-time.text-property.types.ts"
import type { Link } from "akasha/alan/track/to-do/properties/link.url-property.types.ts"
import type { ToDoAnchoredFromCompletion } from "akasha/alan/track/to-do/properties/to-do-anchored-from-completion.boolean-property.types.ts"
import type { ToDoCategory } from "akasha/alan/track/to-do/properties/to-do-category.select-property.types.ts"
import type { ToDoCompletedAt } from "akasha/alan/track/to-do/properties/to-do-completed-at.instant-property.types.ts"
import type { ToDoDueDate } from "akasha/alan/track/to-do/properties/to-do-due-date.calendar-date-property.types.ts"
import type { ToDoLastCompletedAt } from "akasha/alan/track/to-do/properties/to-do-last-completed-at.instant-property.types.ts"
import type { ToDoRecurrence } from "akasha/alan/track/to-do/properties/to-do-recurrence.text-property.types.ts"
import type { ToDoSortOrder } from "akasha/alan/track/to-do/properties/to-do-sort-order.number-property.types.ts"
import type { ToDoValue } from "akasha/alan/track/to-do/properties/to-do-value.relation-property.types.ts"
import type { WhatItTakes } from "akasha/alan/track/to-do/properties/what-it-takes.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Priority } from "akasha/page/properties/priority.select-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ToDo = Page & {
  title: Title
  toDoAnchoredFromCompletion?: ToDoAnchoredFromCompletion
  toDoCategory?: ToDoCategory
  difficulty?: Difficulty
  toDoDueDate?: ToDoDueDate
  dueTime?: DueTime
  link?: Link
  priority: Priority
  toDoRecurrence?: ToDoRecurrence
  toDoSortOrder?: ToDoSortOrder
  toDoValue?: ToDoValue
  toDoLastCompletedAt?: ToDoLastCompletedAt
  toDoCompletedAt?: ToDoCompletedAt
  whatItTakes?: WhatItTakes
}
