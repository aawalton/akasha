import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const foldBeatsIntoFile = {
  id: "01a102fb-d05d-7ed1-9a3a-76580c6c21dd",
  type: "page-type/change-agent",
  slug: "fold-beats-into-file",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "a turn's inline beats, scenes, changes and memory folded into its one beats file",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages folded are the pages of that page type and of every type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages are folded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change, and the refusal names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits are worked out by the mechanical change reached through the runner.",
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
