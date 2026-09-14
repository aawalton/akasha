import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const moveFolder = {
  id: "01a07c54-a9b0-797b-add8-8e9d734c5213",
  type: "change-agent",
  slug: "move-folder",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "one folder and every file under it moved to another path",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The move is left to the mechanical change moving a folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
