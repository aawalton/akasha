import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const correctReadingBooleans = {
  id: "01a15986-7082-7942-81d5-9c4830ba3aa2",
  type: "page-type/change-agent",
  slug: "correct-reading-booleans",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "every character's readings, with the booleans a misread false turned true put right",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading saying it is in the Infinite Archive with no Archive evidence loses inArchive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Archive evidence is an Archive boon, or a buff whose ability is a boon's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's slottable takes the value the star's catalog page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star the catalog lacks keeps the slottable the reading holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line changed takes the result its corrected reading names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line corrected to an earlier line's result and capture is taken out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two lines corrected to one result and two captures refuse the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every line left unchanged keeps its text.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change leaves inCombat as the reading holds it.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-20T13:35:45.281Z",
  updatedAt: "2026-10-20T13:39:19.314Z",
} as const satisfies ChangeAgent
