import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
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
import type { ToDoValueSlug } from "./properties/to-do-value-slug.relation-property.ts"
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
  toDoValueSlug?: ToDoValueSlug
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
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/to-do-anchored-from-completion",
    "calendar-date-property/to-do-due-date",
    "file-property/what-it-takes",
    "instant-property/to-do-completed-at",
    "instant-property/to-do-last-completed-at",
    "number-property/to-do-sort-order",
    "relation-property/to-do-value-slug",
    "select-property/difficulty",
    "select-property/to-do-category",
    "select-property/to-do-priority",
    "text-property/due-time",
    "text-property/to-do-recurrence",
    "url-property/link",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "to-do-anchored-from-completion", required: false, many: false },
    { pagePropertySlug: "to-do-category", required: false, many: false },
    { pagePropertySlug: "difficulty", required: false, many: false },
    { pagePropertySlug: "to-do-due-date", required: false, many: false },
    { pagePropertySlug: "text-property/due-time", required: false, many: false },
    { pagePropertySlug: "link", required: false, many: false },
    { pagePropertySlug: "to-do-priority", required: true, many: false },
    { pagePropertySlug: "to-do-recurrence", required: false, many: false },
    { pagePropertySlug: "to-do-sort-order", required: false, many: false },
    { pagePropertySlug: "to-do-value-slug", required: false, many: false },
    {
      pagePropertySlug: "to-do-last-completed-at",
      required: false,
      many: false,
      uncommitted: true,
    },
    { pagePropertySlug: "to-do-completed-at", required: false, many: false, uncommitted: true },
    { pagePropertySlug: "what-it-takes", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recurring to-do earns once a day, however many times it is completed.",
    },
    {
      invariantKind: "departure",
      statement: "A to-do carrying no difficulty earns nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A to-do that has not been sorted belongs to no value.",
    },
    {
      invariantKind: "departure",
      statement: "A to-do's body is what doing it takes.",
    },
    {
      invariantKind: "departure",
      statement: "When a to-do was last finished stands outside the commit.",
    },
  ],
} as const satisfies PageType
