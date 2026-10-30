import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const moveCodeExport = {
  id: "01a0879d-8148-79b2-b976-efaa5137360f",
  type: "page-type/change-agent",
  slug: "move-code-export",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a change that moves a named piece of code to another file",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The path moved from and the path moved to and the name moved are three arguments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Working the move out is left to the change reached.",
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
  createdAt: "2026-09-09T19:20:41.544Z",
  updatedAt: "2026-10-30T17:03:35.855Z",
} as const satisfies ChangeAgent
