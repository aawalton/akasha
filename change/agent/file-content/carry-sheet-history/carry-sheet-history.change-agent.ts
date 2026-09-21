import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const carrySheetHistory = {
  id: "01a0c4e5-b49d-7a5e-85b6-ebb9906ec42c",
  type: "page-type/change-agent",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  slug: "carry-sheet-history",
  definition: "what a note holds of a sheet's history, carried into the row the game reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A note and a row are matched by the name the sheet states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An entry is carried only where the row's account of it is the opening of the note's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry the row states further than the note is left as the row states it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage the body does not hold once refuses the change before anything lands.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes a note away.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 60,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
