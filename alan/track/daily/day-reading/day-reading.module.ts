import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayReading = {
  id: "01a072fc-7da2-7b59-939d-ab395d803995",
  pageTypeSlug: "module",
  type: "module",
  slug: "day-reading",
  definition: "one of Alan's days, read off the akasha page that day is kept on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Keys are asked in camel and a row is answered in kebab.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key naming an entry answers that entry's rows rather than the file's extension.",
    },
    {
      invariantKind: "departure",
      statement: "An answered row's `at` is the day's slug rather than a file path.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller reducing a day in the kebab spelling takes the values rather than the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key the day page type declares nothing for is refused rather than answered as absent.",
    },
  ],
} as const satisfies Module
