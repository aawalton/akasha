import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeReading = {
  id: "01a06867-dbcb-78e4-a9b3-4a59f26c06ca",
  pageTypeSlug: "module",
  slug: "work-tree-reading",
  definition: "the work tree asked of the harness and the answer read back into rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The tree is asked as a child process because composing it opens page bodies and only bun loads one.",
    },
    {
      invariantKind: "departure",
      statement: "The colors are asked apart from the tree, since reading them opens no page.",
    },
    {
      invariantKind: "constraint",
      statement: "An answer that is no JSON object is refused as naming no initiative at all.",
    },
    {
      invariantKind: "constraint",
      statement: "An answer naming no checkout is refused, since no path could be joined to it.",
    },
    {
      invariantKind: "constraint",
      statement: "A row carrying no key is refused rather than drawn as a keyless initiative.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the place in the answer the bad row stood at.",
    },
    {
      invariantKind: "departure",
      statement: "A row carrying no label is labelled by its key.",
    },
    {
      invariantKind: "departure",
      statement: "A color is read under either spelling the command answers with.",
    },
    {
      invariantKind: "departure",
      statement: "A color that is no text or is empty is read as no color.",
    },
    {
      invariantKind: "departure",
      statement: "The colors are raised through the tree as the answer is read rather than after.",
    },
    {
      invariantKind: "departure",
      statement: "A row's document is the checkout joined to the path that row carries.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes the tree the command answers with.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
