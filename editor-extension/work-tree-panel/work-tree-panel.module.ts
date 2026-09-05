import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreePanel = {
  id: "01a06867-dbcc-7879-ad46-099350c0a109",
  pageTypeSlug: "module",
  slug: "work-tree-panel",
  definition: "the Work panel brought up, and the initiatives drawn into it from one file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The initiatives are read from the file the service writes rather than composed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The panel draws the rows that file carries before any change to that file arrives.",
    },
    {
      invariantKind: "departure",
      statement: "The panel draws again when that file is written and at no other time.",
    },

    {
      invariantKind: "departure",
      statement: "The rows the file carries are drawn as they are rather than spelled again.",
    },
    {
      invariantKind: "departure",
      statement: "A color is carried on as its name, the decoration being what reads that name.",
    },
    {
      invariantKind: "departure",
      statement: "A row drawn more than once is said to Alan once and named on the channel.",
    },
    {
      invariantKind: "departure",
      statement: "Every drawing's outcome is recorded as an observation under the panel's name.",
    },
    {
      invariantKind: "absence",
      statement: "No timer starts a drawing.",
    },
    {
      invariantKind: "absence",
      statement: "No watcher on a seat file or an initiative file is registered here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes the tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here raises a color through the rows.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a row's appearance.",
    },
  ],
} as const satisfies Module
