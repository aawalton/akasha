import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const iconIndexRendering = {
  id: "01a06869-1dd9-7000-9568-50cc17d96243",
  type: "module",
  slug: "icon-index-rendering",
  definition: "a folder of lucide icon metadata read and rendered as the pages a search runs over",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An icon's keywords have every word its name is split into.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An icon's keywords have every tag and alias and category the icon states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shard already standing keeps the identity that shard had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A shard already there is the index's answer for its page type rather than a folder listed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page named like a shard but sitting elsewhere is no shard.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The module page type is reached by the id it keeps rather than by the slug it answers to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A rendered page imports the type file beside that page type rather than the page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rendered page names that file by its path rather than by a package.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shard has at least one icon however long that icon's line is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One icon whose line alone runs past the budget is refused rather than divided.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The entries budget leaves room for what formatting adds and the pascal budget does not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body rendered at or past the size a write refuses renders nothing at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The page anything outside imports reaches its shards by the path every shard sits at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That page names each shard from the root rather than by a relative path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shard no longer reached is taken away rather than left unimported.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a file or reaches the network.",
    },
  ],
} as const satisfies Module
