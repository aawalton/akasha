import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const appendLinesFrom = {
  id: "01a09312-fac0-7cab-bb6c-b8e6116903b3",
  type: "change-agent",
  slug: "append-lines-from",
  changeMode: "change-mode-append",
  definition: "content one path holds, put at the end of what another path holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The content is read off a path the tree holds rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this change was handed no value for is refused by that key.",
    },
    {
      invariantKind: "departure",
      statement: "A path the tree holds no text at is refused.",
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
      invariantKind: "stopgap",
      statement: "This change goes once the entries it carries have landed.",
    },
  ],
  changeKind: "change-authored",
} as const satisfies ChangeAgent
