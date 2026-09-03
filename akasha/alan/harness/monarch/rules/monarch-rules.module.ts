import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRules = {
  id: "01a06863-ac0c-70d6-942f-2e0d22cae9d5",
  pageTypeSlug: "module",
  slug: "monarch-rules",
  definition:
    "what a category rule is, and what one decides about a transaction and the rows around it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The keys and comparisons a rule may state are the two select properties' own values, and a page holding a word outside them is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A rule either names a category or reserves the transaction for a person.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every text clause holds where any of its values holds, and a clause naming nothing holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A description clause is a list of groups, each of which must hold, so several runs of words can be required at once.",
    },
    {
      invariantKind: "departure",
      statement: "An account is compared by its last four digits rather than by its title.",
    },
    {
      invariantKind: "departure",
      statement:
        "A counterpart is the opposite amount in another account within the stated window.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row bears on a subject where the amounts agree in size and the days are within twice the window, which is wider than the pairing itself so a contest is seen.",
    },
    {
      invariantKind: "departure",
      statement: "Several counterparts are an ambiguity rather than a choice.",
    },
    {
      invariantKind: "departure",
      statement:
        "A counterpart another matching row could equally claim is an ambiguity naming both rivals.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule that matches and finds no counterpart leaves the transaction unpaired rather than firing.",
    },
    {
      invariantKind: "departure",
      statement: "A rule with no counterpart clause consults no other row at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bucketed neighbourhood is the plain one, because a counterpart's amount agrees in size by definition.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or reaches Monarch.",
    },
  ],
} as const satisfies Module
