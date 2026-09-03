import type { List } from "../list.page-type.ts"

export const formulaFunctions = {
  id: "01a044f6-92f4-7000-bd56-cfb469344e29",
  pageTypeSlug: "list",
  slug: "formula-functions",
  definition: "the functions a formula can call",
  members: [
    { memberName: "now", definition: "the moment the formula is worked out, as an instant" },
    { memberName: "hoursBetween", definition: "the hours between two instants, never negative" },
    { memberName: "contains", definition: "whether a list holds a value" },
    {
      memberName: "hasWord",
      definition: "whether a text holds a word bounded by a non-letter non-digit, ignoring case",
    },
    {
      memberName: "text",
      definition: "a whole number written as its digits, and absent for one that is not whole",
    },
  ],
} as const satisfies List
