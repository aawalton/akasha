import type { Index } from "akasha/pages/indexes/index.page-type.types.ts"

export const indexRule = {
  id: "01a08eb9-6a3c-7837-a76a-dae78826bdc2",
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
      statement: "A path read for rules is filed whether or not a body sits at that path.",
    },
    {
      invariantKind: "departure",
      statement: "A path with no body spells no rule, so the map is whole with that path in it.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild takes the paths to file from the same answer the reader asks for.",
    },
    {
      invariantKind: "absence",
      statement: "The paths filed as read are never worked out from the tree a rebuild walks.",
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
      statement: "A rule a file spells is a function of that file's body and of the reader.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild files which reader spelled the rules that rebuild filed.",
    },
    {
      invariantKind: "departure",
      statement: "That reader is named by what the reader spells for the reader's own body.",
    },
    {
      invariantKind: "departure",
      statement: "A landing files no reader, one landing refiling one path rather than the map.",
    },
    {
      invariantKind: "departure",
      statement: "A map another reader filed is not whole however many paths were read.",
    },
    {
      invariantKind: "departure",
      statement: "A map naming no reader is not whole.",
    },
    {
      invariantKind: "departure",
      statement: "A reader that changed leaves the map to be filed again rather than read.",
    },
    {
      invariantKind: "absence",
      statement: "No reader is named by a number someone keeps by hand.",
    },
    {
      invariantKind: "absence",
      statement: "A parse moving no rule in the reader's own body is not answered for here.",
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
