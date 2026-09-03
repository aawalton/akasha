import type { Module } from "@akasha/code-system/module"

export const fileKindAuthorship = {
  id: "01a0685e-59a0-7002-862e-796571404269",
  pageTypeSlug: "module",
  slug: "file-kind-authorship",
  definition:
    "whether a file kind is written by hand or emitted by a tool, and the node it stands as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file kind is authored or serialized and never both.",
    },
    {
      invariantKind: "departure",
      statement: "A kind no rule names as authored is serialized.",
    },
    {
      invariantKind: "departure",
      statement: "A kind's node type is the kind's own name followed by `-file`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens the file the kind describes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which extension carries a kind.",
    },
  ],
} as const satisfies Module
