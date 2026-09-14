import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addPageTypeTypes = {
  id: "01a08841-685b-7549-a8a6-d9a63c78b069",
  type: "change-agent",
  slug: "add-page-type-types",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "one page type turned over to the code that writes its type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type's own file is the one argument.",
    },
    {
      invariantKind: "departure",
      statement: "That file is handed to the mechanical change turning a page type over.",
    },
    {
      invariantKind: "departure",
      statement: "The key naming the file and the move of the type are that change's one answer.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal from that change is the refusal this act gives.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "No change but that one rung is reached.",
    },
  ],
  changeKind: "change-checked",
  maxCpuSeconds: 120,
} as const satisfies ChangeAgent
