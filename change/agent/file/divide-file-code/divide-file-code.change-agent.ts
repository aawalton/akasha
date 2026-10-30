import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const divideFileCode = {
  id: "01a09c47-b808-729b-93da-e1e57e0056a9",
  type: "page-type/change-agent",
  slug: "divide-file-code",
  changeMode: "change-mode/change-mode-divide",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "a change that moves part of a code file into a new code file",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The path divided and the path made and the exports named are three arguments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Working the division out is left to the change reached.",
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
  maxMemoryMb: 1024,
  createdAt: "2026-09-13T19:39:01.000Z",
  updatedAt: "2026-10-30T17:07:21.615Z",
} as const satisfies ChangeAgent
