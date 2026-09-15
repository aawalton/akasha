import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAgreement = {
  id: "01a06863-ac0b-7070-8802-ece61d5b73b6",
  type: "page-type/module",
  slug: "monarch-agreement",
  definition: "our copy of Monarch counted against Monarch, and where the two part",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count of all transactions is compared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count of transactions needing review is compared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count of uncategorized transactions is compared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Monarch is asked for a count rather than for the rows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Agreement costs three calls.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Our side is counted from the pages rather than from a second query.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A transaction naming no category or naming the uncategorized page counts as uncategorized.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Nothing here files a record of a disagreement or keeps this module's last answer.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A disagreement reaches somebody who can act on that disagreement.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Parting is left non-zero.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here repairs a disagreement.",
    },
  ],
} as const satisfies Module
