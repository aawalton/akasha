import type { ChangeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.types.ts"

export const changeProsePattern = {
  id: "01a09c40-46df-7fc1-aa5e-e1da32da2123",
  type: "change-mechanical",
  slug: "change-prose-pattern",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/prose",
  changeTargetSubtype: "change-target-subtype/prose-pattern",
  definition: "every passage a banned term is written in restated in one answer",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A passage is restated where a pair says what is written instead.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a passage away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The spellings and the pairs are handed in rather than read off a page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every passage of every page is answered for in this one answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A passage is reached under the key its page type states prose under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field of a record is reached by the words that field states already.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prose value under more than one record is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prose value stating many strings is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count handed in holds how many passages one run restates.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed no count restates every passage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A program composes each restatement.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One body is read once however many passages that body states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passages of one body are answered by one edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The module splicing a body is called rather than reached through a rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One passage refused refuses the whole.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "This runs only where the model the parser reads is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No rung beneath is reached.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanical
