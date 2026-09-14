import type { ChangeMechanical } from "akasha/changes/mechanical/change-mechanical.page-type.types.ts"

export const changeProsePattern = {
  id: "01a09c40-46df-7fc1-aa5e-e1da32da2123",
  type: "change-mechanical",
  slug: "change-prose-pattern",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/prose",
  changeTargetSubtype: "change-target-subtype/prose-pattern",
  definition: "every passage a banned term is written in restated in one answer",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  guards: ["change-guard/relation-reaches-a-page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The spellings and the pairs are handed in rather than read off a page.",
    },
    {
      invariantKind: "departure",
      statement: "Every passage of every page is answered for in this one answer.",
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
      statement: "A count handed in holds how many passages one run restates.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count restates every passage.",
    },
    {
      invariantKind: "departure",
      statement: "A program composes each restatement.",
    },
    {
      invariantKind: "departure",
      statement: "One body is read once however many passages that body states.",
    },
    {
      invariantKind: "departure",
      statement: "The passages of one body are answered by one edit.",
    },
    {
      invariantKind: "departure",
      statement: "The module splicing a body is called rather than reached through a rung.",
    },
    {
      invariantKind: "departure",
      statement: "One passage refused refuses the whole.",
    },
    {
      invariantKind: "constraint",
      statement: "This runs only where the model the parser reads is.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
