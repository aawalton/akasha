import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayReading = {
  id: "01a072fc-7da2-7b59-939d-ab395d803995",
  type: "page-type/module",
  slug: "day-reading",
  definition: "one of Alan's days, read off that day's akasha page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Keys are asked in camel and a row is answered in kebab.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key naming an entry answers that entry's rows rather than the file's extension.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answered row's `at` is the day's slug rather than a file path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller reducing a day in the kebab spelling takes the values rather than the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key the day page type declares nothing for is refused rather than answered as absent.",
    },
  ],
} as const satisfies Module
