import type { Module } from "@akasha/code-system/module"

export const moveArguing = {
  id: "01a05d7c-6c94-7f58-bcd8-e33b648ac89a",
  pageTypeSlug: "module",
  slug: "move-arguing",
  definition:
    "the pairs and the flags a move's command line says, read before anything is looked at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pair is a `--from` answered by the `--to` following that `--from`.",
    },
    {
      invariantKind: "departure",
      statement: "A second `--from` before its `--to` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A `--to` before any `--from` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A `--from` left unanswered when the line ends is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag a move does not take is refused rather than passed along.",
    },
    {
      invariantKind: "departure",
      statement: "A flag carrying free text takes a value opening with a dash.",
    },
    {
      invariantKind: "departure",
      statement: "A flag naming a path does not.",
    },
    {
      invariantKind: "departure",
      statement:
        "The flags a move takes are named here for whoever reads the line and whoever reads the rest.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or the index.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a path is under the akasha folder is judged elsewhere.",
    },
  ],
} as const satisfies Module
