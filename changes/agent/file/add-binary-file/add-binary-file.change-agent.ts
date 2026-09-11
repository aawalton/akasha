import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addBinaryFile = {
  id: "01a09116-8eac-7885-886c-17c41e842516",
  type: "change-agent",
  slug: "add-binary-file",
  changeMode: "change-mode-add",
  definition: "one body the tree already holds, landed at the path that body sits at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path is handed in and the body is not.",
    },
    {
      invariantKind: "departure",
      statement: "The body landed is the body the tree holds at that path when the edits land.",
    },
    {
      invariantKind: "departure",
      statement: "A body of any bytes lands this way, because no argument spells that body.",
    },
    {
      invariantKind: "departure",
      statement: "A path the tree holds no body at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      invariantKind: "absence",
      statement: "This change works no body out, so this change reaches no mechanical change.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
