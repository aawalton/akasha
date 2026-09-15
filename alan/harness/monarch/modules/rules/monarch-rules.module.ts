import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRules = {
  id: "01a06863-ac0c-70d6-942f-2e0d22cae9d5",
  type: "page-type/module",
  slug: "monarch-rules",
  definition:
    "what a category rule is, and what one decides about a transaction and the rows around it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The keys and comparisons a rule may state are the two select properties' own values.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page with a word outside the two select properties' values is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule either names a category or reserves the transaction for a person.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A text clause holds where the value the clause names holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clause naming nothing holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A description clause is a list of groups.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every group of a description clause must hold.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account is compared by its last four digits rather than by its title.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A counterpart is the opposite amount in another account within the stated window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row bears on a subject where the amounts agree in size and the days are within twice the window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Several counterparts are an ambiguity rather than a choice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A counterpart another matching row could equally claim is an ambiguity naming both rivals.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rule that matches and finds no counterpart leaves the transaction unpaired rather than firing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule with no counterpart clause consults no other row at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bucketed neighbourhood is the plain neighbourhood.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file or reaches Monarch.",
    },
  ],
} as const satisfies Module
