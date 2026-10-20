import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const correctSetArmorLines = {
  id: "01a159eb-72f5-7ece-a37b-387eb121a765",
  type: "page-type/change-agent",
  slug: "correct-set-armor-lines",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition: "every set's bonuses, with each Armor line the import halved put right",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus reading only `Adds N Armor` whose one effect adds half of N adds N.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Half of N is N halved and rounded down, as the import stored it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus adding N Armor already is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An Armor line holding neither N nor half of N is left as it is and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other line keeps its text.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-20T15:26:05.044Z",
  updatedAt: "2026-10-20T15:26:05.044Z",
} as const satisfies ChangeAgent
