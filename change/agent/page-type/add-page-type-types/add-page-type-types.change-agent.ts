import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addPageTypeTypes = {
  id: "01a08841-685b-7549-a8a6-d9a63c78b069",
  type: "page-type/change-agent",
  slug: "add-page-type-types",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "a page type turned over to the code that writes its type",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type's own file is the one argument.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That file is handed to the mechanical change turning a page type over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key naming the file and the move of the type are that change's one answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal from that change is the refusal this act gives.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No change but that one rung is reached.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
