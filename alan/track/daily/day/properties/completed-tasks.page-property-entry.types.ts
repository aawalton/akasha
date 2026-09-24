import type { AnchoredFromCompletion } from "akasha/alan/track/daily/day/properties/anchored-from-completion.boolean-property.types.ts"
import type { Recurrence } from "akasha/alan/track/daily/day/properties/recurrence.text-property.types.ts"
import type { ToDoSlug } from "akasha/alan/track/daily/day/properties/to-do-slug.text-property.types.ts"
import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { Priority } from "akasha/page/properties/priority.select-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { PageValue } from "akasha/persona/properties/page-value.relation-property.types.ts"
import type { CompletedAt } from "akasha/temper/player/progress/temper-task/properties/completed-at.instant-property.types.ts"
import type { DueDate } from "akasha/temper/player/progress/thing/properties/due-date.calendar-date-property.types.ts"
import type { Category } from "akasha/temper/thing/properties/category.text-property.types.ts"

export type CompletedTasks = "jsonl"

export type CompletedTasksRow = {
  id: Id
  title: Title
  completedAt: CompletedAt
  dueDate?: DueDate
  value?: PageValue
  recurrence?: Recurrence
  category?: Category
  toDoSlug?: ToDoSlug
  priority?: Priority
  anchoredFromCompletion?: AnchoredFromCompletion
  description?: Description
}
