import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const moveCodeExport = {
  id: "01a0879d-8148-79b2-b976-efaa5137360f",
  type: "change-agent",
  slug: "move-code-export",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "one export moved to another code body, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The path moved from and the path moved to and the name moved are three arguments.",
    },
    {
      invariantKind: "departure",
      statement: "Working the move out is left to the change reached.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
