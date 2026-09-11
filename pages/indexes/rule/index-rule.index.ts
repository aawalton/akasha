import type { Index } from "akasha/pages/indexes/index.page-type.types.ts"

export const indexRule = {
  id: "01a08eb9-6a3c-7837-a76a-dae78826bdc2",
  pageTypeSlug: "index",
  type: "index",
  slug: "index-rule",
  definition: "an index from what a function says to the files spelling it",
  name: "rule",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A said file is named for the digest of the rule that file answers.",
    },
    {
      invariantKind: "departure",
      statement: "A line has the path, the place in that path, and the name spelling the rule.",
    },
    {
      invariantKind: "departure",
      statement: "The place is the count of rules that path spells before this one.",
    },
    {
      invariantKind: "departure",
      statement: "Only a body named `.ts` or `.tsx` spells a rule.",
    },
    {
      invariantKind: "departure",
      statement: "A function only passing names along spells no rule.",
    },
    {
      invariantKind: "departure",
      statement: "A rule string comes from the module reading rules rather than from here.",
    },
    {
      invariantKind: "departure",
      statement: "A path read for rules is filed whether or not that path spells one.",
    },
    {
      invariantKind: "departure",
      statement: "That filing is what says the index has read a path rather than passed it over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reader asks whether every path the index names has been read before trusting it.",
    },
    {
      invariantKind: "departure",
      statement: "A reader answers the paths for one rule ordered by path and then by place.",
    },
    {
      invariantKind: "departure",
      statement: "That order is the order a read over the index's paths would spell them in.",
    },
  ],
} as const satisfies Index
