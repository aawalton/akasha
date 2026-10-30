import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removeFolder = {
  id: "01a08281-d6e6-78ee-a0cc-ad533d8405ae",
  type: "page-type/change-agent",
  slug: "remove-folder",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "a change that removes a folder and every file under that folder",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The removal is left to the mechanical change taking a folder away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
  createdAt: "2026-09-08T19:32:22.374Z",
  updatedAt: "2026-10-30T16:57:11.386Z",
} as const satisfies ChangeAgent
