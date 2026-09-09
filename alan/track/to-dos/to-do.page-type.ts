import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
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

export const toDo = {
  id: "01a065a1-49b4-7e7c-8b95-ed10df98898c",
  pageTypeSlug: "page-type",
  slug: "to-do",
  definition: "something a person intends to do",
  pluralSlug: "to-dos",
  extends: ["page-type/page"],
  partSlugs: [
    "boolean-property/to-do-anchored-from-completion",
    "calendar-date-property/to-do-due-date",
    "file-property/what-it-takes",
    "instant-property/to-do-completed-at",
    "instant-property/to-do-last-completed-at",
    "number-property/to-do-sort-order",
    "relation-property/to-do-value",
    "select-property/difficulty",
    "select-property/to-do-category",
    "select-property/to-do-priority",
    "text-property/due-time",
    "text-property/to-do-recurrence",
    "url-property/link",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    {
      pagePropertySlug: "boolean-property/to-do-anchored-from-completion",
      required: false,
      many: false,
    },
    { pagePropertySlug: "select-property/to-do-category", required: false, many: false },
    { pagePropertySlug: "select-property/difficulty", required: false, many: false },
    { pagePropertySlug: "calendar-date-property/to-do-due-date", required: false, many: false },
    { pagePropertySlug: "text-property/due-time", required: false, many: false },
    { pagePropertySlug: "url-property/link", required: false, many: false },
    { pagePropertySlug: "select-property/to-do-priority", required: true, many: false },
    { pagePropertySlug: "text-property/to-do-recurrence", required: false, many: false },
    { pagePropertySlug: "number-property/to-do-sort-order", required: false, many: false },
    { pagePropertySlug: "relation-property/to-do-value", required: false, many: false },
    { pagePropertySlug: "instant-property/to-do-last-completed-at", required: false, many: false },
    { pagePropertySlug: "instant-property/to-do-completed-at", required: false, many: false },
    { pagePropertySlug: "file-property/what-it-takes", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recurring to-do earns once a day however many times that to-do is completed.",
    },
    {
      invariantKind: "departure",
      statement: "A to-do with no difficulty earns nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A to-do that has not been sorted belongs to no value.",
    },
    {
      invariantKind: "departure",
      statement: "A to-do's body is the work doing that to-do takes.",
    },
    {
      invariantKind: "departure",
      statement: "A to-do's completion history is the git history of that to-do's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A finished to-do is kept as the same page rather than as a page of its own.",
    },
  ],
} as const satisfies PageType
