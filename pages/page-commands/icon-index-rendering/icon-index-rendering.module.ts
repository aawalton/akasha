import type { Module } from "@akasha/code-system/module"

export const iconIndexRendering = {
  id: "01a06869-1dd9-7000-9568-50cc17d96243",
  pageTypeSlug: "module",
  slug: "icon-index-rendering",
  definition: "a folder of lucide icon metadata read and rendered as the pages a search runs over",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An icon's keywords are its name's words, its tags, its aliases and its categories.",
    },
    {
      invariantKind: "departure",
      statement: "A shard already standing keeps the identity it had.",
    },
    {
      invariantKind: "departure",
      statement: "A shard holds at least one icon however long that icon's line is.",
    },
    {
      invariantKind: "departure",
      statement: "One icon whose line alone runs past the budget is refused rather than divided.",
    },
    {
      invariantKind: "departure",
      statement:
        "The entries budget leaves room for what formatting adds and the pascal budget does not.",
    },
    {
      invariantKind: "departure",
      statement: "A body rendered at or past the size a write refuses renders nothing at all.",
    },
    {
      invariantKind: "departure",
      statement: "The page anything outside imports reaches its shards by the path each stands at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or reaches the network.",
    },
  ],
} as const satisfies Module
