import type { List } from "../../../domains/lists/list.page-type.ts"

export const formulaValues = {
  id: "01a044c8-4d47-7000-8da5-ba970e366a7a",
  pageTypeSlug: "list",
  slug: "formula-values",
  definition: "the values a formula can hold",
  members: [
    { memberName: "text", definition: "a run of characters" },
    { memberName: "number", definition: "a count or a measure, whole or fractional" },
    { memberName: "boolean", definition: "true or false" },
    { memberName: "list", definition: "several values of one kind, in order" },
    {
      memberName: "instant",
      definition: "a moment in time, which only a function taking one may read",
    },
    { memberName: "date", definition: "a day, written as the year, the month and the day" },
    {
      memberName: "absent",
      definition: "what a formula gets where the page holds nothing under the key",
    },
  ],
} as const satisfies List
