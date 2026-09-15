import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleClauses = {
  id: "01a06865-ecc3-70d0-8b6b-c9ad4a35783b",
  type: "page-type/module",
  slug: "monarch-rule-clauses",
  definition: "what one rule page states, read into a checked rule",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing skips a clause that is not understood.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A comparison a key does not take is refused even where both words are known.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two clauses over the same key and comparison are refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clause with no values is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule stating no clause is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rule narrowing on nothing but a sign or an amount or a counterpart or a date is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule naming no category reserves the transaction for a person.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule that reserves and carries a note is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule that pairs a counterpart and has a note is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty note is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pairing window that is not a whole count of days is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stated rule is a rule page's own words before those words are weighed.",
    },
  ],
} as const satisfies Module
