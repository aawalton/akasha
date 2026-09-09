import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const changeProsePattern = {
  id: "01a0824b-a376-7b9f-a01a-c3a1e81c3286",
  pageTypeSlug: "change-agent",
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
      statement: "A count says how many passages are restated, and no count restates every one.",
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
      statement: "A prose value stating many strings is left alone, because no act reaches one.",
    },
    {
      invariantKind: "departure",
      statement: "One passage refused refuses the whole, so a batch lands together or not at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "The act reached names `relation-reaches-a-page`, so every relation on a page written is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal may name a relation no passage in the batch touched.",
    },
    {
      invariantKind: "constraint",
      statement: "The parser reads a model no commit has, so this runs only where that model is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A program composes each restatement, so the checks judge it and no agent reads it.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
