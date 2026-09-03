import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRuleClauses = {
  id: "01a06865-ecc3-70d0-8b6b-c9ad4a35783b",
  pageTypeSlug: "module",
  slug: "monarch-rule-clauses",
  definition: "what one rule page states, read into a checked rule",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Nothing skips a clause it does not understand, because a clause read by nothing would leave the rule running wider than its page says.",
    },
    {
      invariantKind: "departure",
      statement: "A comparison a key does not take is refused, even where both words are known.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two clauses over the same key and comparison are refused, because only one would be kept.",
    },
    {
      invariantKind: "departure",
      statement: "A clause holding no values is refused, because it would weigh against nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule stating no clause is refused, because it would catch every transaction there is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule narrowing on nothing but a sign, an amount, a counterpart or a date is refused, because none of those says which transactions the rule is about.",
    },
    {
      invariantKind: "departure",
      statement: "A rule naming no category reserves the transaction for a person.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule that reserves and carries a note is refused, because the note would never be written and nothing would report that it was not.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule that pairs a counterpart and carries a note is refused, because one leg would be annotated and the other would not.",
    },
    {
      invariantKind: "departure",
      statement: "An empty note is refused, because it writes a blank over nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A pairing window that is not a whole count of days is refused.",
    },
  ],
} as const satisfies Module
