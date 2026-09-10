import type { PageType } from "@akasha/pages/page-type"

export const toDo = {
  id: "01a065a1-49b4-7e7c-8b95-ed10df98898c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "to-do",
  definition: "something a person intends to do",
  pluralSlug: "to-dos",
  extends: ["page-type/page"],
  parts: [
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
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "boolean-property/to-do-anchored-from-completion",
      required: false,
      many: false,
    },
    { pageProperty: "select-property/to-do-category", required: false, many: false },
    { pageProperty: "select-property/difficulty", required: false, many: false },
    { pageProperty: "calendar-date-property/to-do-due-date", required: false, many: false },
    { pageProperty: "text-property/due-time", required: false, many: false },
    { pageProperty: "url-property/link", required: false, many: false },
    { pageProperty: "select-property/to-do-priority", required: true, many: false },
    { pageProperty: "text-property/to-do-recurrence", required: false, many: false },
    { pageProperty: "number-property/to-do-sort-order", required: false, many: false },
    { pageProperty: "relation-property/to-do-value", required: false, many: false },
    { pageProperty: "instant-property/to-do-last-completed-at", required: false, many: false },
    { pageProperty: "instant-property/to-do-completed-at", required: false, many: false },
    { pageProperty: "file-property/what-it-takes", required: false, many: false },
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
  types: "ts",
} as const satisfies PageType
