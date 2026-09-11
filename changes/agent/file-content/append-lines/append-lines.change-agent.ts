import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const appendLines = {
  id: "01a08c38-a17c-70de-985a-a097e3dced7d",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "append-lines",
  changeMode: "change-mode-append",
  definition: "content put at the end of what one path holds, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The content is handed in rather than read off a file.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this change was handed no value for is refused by that key.",
    },
    {
      invariantKind: "departure",
      statement: "Answering the append is left to the partial this change runs.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the body the path holds.",
    },
  ],
  changeKind: "change-authored",
} as const satisfies ChangeAgent
