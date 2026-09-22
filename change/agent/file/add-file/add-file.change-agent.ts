import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addFile = {
  id: "01a07813-6e3b-77c3-9c1e-b0c5778fd31b",
  type: "page-type/change-agent",
  slug: "add-file",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a body written at a path, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is handed in whole rather than as a passage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body that body was composed against may be handed in beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body handed in that is not the body there refuses the change unwritten.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A caller handing none in writes over whatever the path holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing the body is left to the partial this change runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index files a page this change writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A later act in the same change names a page this change wrote.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
