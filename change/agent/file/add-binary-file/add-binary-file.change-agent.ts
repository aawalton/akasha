import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addBinaryFile = {
  id: "01a09116-8eac-7885-886c-17c41e842516",
  type: "page-type/change-agent",
  slug: "add-binary-file",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a body the tree already holds, landed at that body's own path",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The path is handed in and the body is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body landed is the body the tree holds at that path when the edits land.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body of any bytes lands this way, because no argument spells that body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the tree holds no body at is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change works no body out, so this change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
