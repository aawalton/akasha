import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const warrantSaying = {
  id: "01a095e0-7f50-7b43-ba43-173e2cd13a40",
  type: "module",
  slug: "warrant-saying",
  definition: "what a refusal says of one reading owed, composed from the warrant that owed it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal names the reading owed rather than only saying something is owed.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal carries why the reading is owed.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the read that would answer the warrant ready to run.",
    },
    {
      invariantKind: "departure",
      statement: "One read call names every page a refusal names.",
    },
    {
      invariantKind: "departure",
      statement: "A page a refusal names more than once is named once in that read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal for a body that moved says what the record holds and what is there now.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a body read in part says how far that body reached the agent.",
    },
    {
      invariantKind: "departure",
      statement:
        "A list held back says how many readings are owed past the list and to call again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A warrant owed of a taboo term is told from the rest by the page type its path names.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refusal said of a taboo term asks the writer for a decision about the change.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal said of a taboo term hands that term's whole page back.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal handing a term's page back names running that same call again as the way through.",
    },
    {
      invariantKind: "departure",
      statement: "Which saying one owing takes is decided here rather than by the caller.",
    },
    {
      invariantKind: "absence",
      statement: "A refusal says nothing about how a read behaves.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file, reads the index, or asks which warrants there are.",
    },
  ],
} as const satisfies Module
