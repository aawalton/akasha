import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const auditAnswering = {
  id: "01a09240-d563-7000-8504-881721a6fe23",
  type: "module",
  slug: "audit-answering",
  definition: "the answer an audit gives, held to what one answer carries",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A phase naming no check is refused rather than answered clean.",
    },
    {
      invariantKind: "departure",
      statement: "A run no check takes input from is refused rather than answered clean.",
    },
    {
      invariantKind: "departure",
      statement: "A judging that throws is refused as unjudged rather than answered clean.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reason and a run of refusals are held to a ceiling by `module/refusal-holding`.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is kept whole where a keeper is handed in, and the answer names where.",
    },
    {
      invariantKind: "departure",
      statement: "A run finding nothing keeps nothing and names no file.",
    },
    {
      invariantKind: "departure",
      statement: "What an audit finds is answered as the data's fault.",
    },
    {
      invariantKind: "departure",
      statement: "A check that could not run is answered as operational instead.",
    },
    {
      invariantKind: "departure",
      statement: "An answer says how many checks could not run.",
    },
    {
      invariantKind: "departure",
      statement: "A run asked of the service answers for the commit the verdicts were read at.",
    },
    {
      invariantKind: "departure",
      statement: "A check left unanswered at that commit is named rather than counted clean.",
    },
    {
      invariantKind: "departure",
      statement: "A run left with a check unanswered is operational though nothing refused.",
    },
    {
      invariantKind: "departure",
      statement: "A round that would not start is refused rather than answered clean.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads which checks there are.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks a tree.",
    },
  ],
} as const satisfies Module
