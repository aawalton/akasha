import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const moveFolder = {
  id: "01a07c54-a9b0-797b-add8-8e9d734c5213",
  type: "page-type/change-agent",
  slug: "move-folder",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "a folder and every file under it moved to another path",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The move is left to the mechanical change moving a folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder claimed by a page that moves is carried whole to where that page lands.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
