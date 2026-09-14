import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const removeFolder = {
  id: "01a08281-d6e6-78ee-a0cc-ad533d8405ae",
  type: "change-agent",
  slug: "remove-folder",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/folder",
  changeTargetSubtype: "change-target-subtype/folder",
  definition: "one folder and every file under it taken away",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The removal is left to the mechanical change taking a folder away.",
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
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
