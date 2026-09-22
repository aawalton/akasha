import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const moveFile = {
  id: "01a0c688-c36b-7eed-8d1f-9be22902c9a5",
  type: "page-type/change-agent",
  slug: "move-file",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "one file that is no page moved to another path",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path naming a page is refused rather than moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move is left to the mechanical change moving that kind of file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A code file moved this way has every body importing it repointed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
} as const satisfies ChangeAgent
