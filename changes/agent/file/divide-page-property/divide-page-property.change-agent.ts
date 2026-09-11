import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const dividePageProperty = {
  id: "01a08df3-43fc-70b7-b21c-a996acd3d268",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "divide-page-property",
  changeMode: "change-mode-divide",
  definition: "one page property's rows laid out again across the files the ceiling takes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page the rows sit beside is named by `at`.",
    },
    {
      invariantKind: "departure",
      statement: "The property those rows are held in is named by `property`.",
    },
    {
      invariantKind: "departure",
      statement: "A call handed no value for a key is refused by that key.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out where the files divide.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
