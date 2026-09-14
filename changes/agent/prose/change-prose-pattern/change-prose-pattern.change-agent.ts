import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const changeProsePattern = {
  id: "01a0824b-a376-7b9f-a01a-c3a1e81c3286",
  type: "change-agent",
  slug: "change-prose-pattern",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/prose",
  changeTargetSubtype: "change-target-subtype/prose-pattern",
  definition: "every passage a banned term is written in restated in the words written instead",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The spellings and the pairs are read off the banned term rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A count says how many passages are restated.",
    },
    {
      invariantKind: "departure",
      statement: "Naming no count restates every passage.",
    },
    {
      invariantKind: "departure",
      statement: "The restatements are worked out by the change reached.",
    },
    {
      invariantKind: "departure",
      statement: "The act reached names `relation-reaches-a-page`.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal may name a relation no passage in the batch touched.",
    },
    {
      invariantKind: "constraint",
      statement: "This runs only where the model the parser reads is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's own body.",
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
