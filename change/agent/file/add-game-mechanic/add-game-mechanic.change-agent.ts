import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const addGameMechanic = {
  id: "01a0c496-2b97-76ff-8b10-c786cbff7340",
  type: "page-type/change-agent",
  slug: "add-game-mechanic",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-page",
  definition: "a mechanic written as a page with its code, and named by the game needing it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller hands in the code and the change composes the page around it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mechanic sits beside the mechanics already written rather than by a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type claims the mechanic and the game names it in the same landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no game refuses the change before anything is written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges what the code does.",
    },
  ],
  changeKind: "change-kind/change-authored",
  maxCpuSeconds: 60,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
