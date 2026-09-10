import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const changeProsePattern = {
  id: "01a0824b-a376-7b9f-a01a-c3a1e81c3286",
  pageTypeSlug: "change-agent",
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
      statement: "A passage is reached under the key its page type states prose under.",
    },
    {
      invariantKind: "departure",
      statement: "A field of a record is reached by the words that field states already.",
    },
    {
      invariantKind: "departure",
      statement: "A prose value under more than one record is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A prose value stating many strings is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "One passage refused refuses the whole.",
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
      invariantKind: "departure",
      statement: "A program composes each restatement.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
