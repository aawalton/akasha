import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const divideFileCode = {
  id: "01a09c47-b808-729b-93da-e1e57e0056a9",
  type: "change-agent",
  slug: "divide-file-code",
  changeMode: "change-mode-divide",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file-code",
  definition: "exports carried into a code file made for them, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path divided and the path made and the exports named are three arguments.",
    },
    {
      invariantKind: "departure",
      statement: "Working the division out is left to the change reached.",
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
  changeKind: "change-checked",
  maxCpuSeconds: 30,
} as const satisfies ChangeAgent
