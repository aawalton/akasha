import type { Module } from "@akasha/code/module"

export const iconIndexRendering = {
  id: "01a06869-1dd9-7000-9568-50cc17d96243",
  pageTypeSlug: "module",
  type: "module",
  slug: "icon-index-rendering",
  definition: "a folder of lucide icon metadata read and rendered as the pages a search runs over",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An icon's keywords have every word its name is split into.",
    },
    {
      invariantKind: "departure",
      statement: "An icon's keywords have every tag and alias and category the icon states.",
    },
    {
      invariantKind: "departure",
      statement: "A shard already standing keeps the identity that shard had.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shard already there is the index's answer for its page type rather than a folder listed.",
    },
    {
      invariantKind: "departure",
      statement: "A page named like a shard but sitting elsewhere is no shard.",
    },
    {
      invariantKind: "departure",
      statement:
        "The module page type is reached by the id it keeps rather than by the slug it answers to.",
    },
    {
      invariantKind: "departure",
      statement: "A shard has at least one icon however long that icon's line is.",
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
      statement:
        "The page anything outside imports reaches its shards by the path every shard sits at.",
    },
    {
      invariantKind: "departure",
      statement: "A shard no longer reached is taken away rather than left unimported.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file or reaches the network.",
    },
  ],
} as const satisfies Module
