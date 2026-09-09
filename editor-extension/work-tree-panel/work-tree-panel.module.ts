import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreePanel = {
  id: "01a06867-dbcc-7879-ad46-099350c0a109",
  pageTypeSlug: "module",
  type: "module",
  slug: "work-tree-panel",
  definition: "the Work panel brought up, and the initiatives drawn into it from one file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The initiatives are read from the file the service writes and reordered here.",
    },
    {
      invariantKind: "departure",
      statement: "The panel draws what that file has as the panel comes up.",
    },
    {
      invariantKind: "departure",
      statement: "The panel draws again when that file is written and when a row is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The rows the file has are drawn unchanged but for the order a drop sets.",
    },
    {
      invariantKind: "departure",
      statement: "A color is carried on as its name.",
    },
    {
      invariantKind: "departure",
      statement: "The decoration reads that name.",
    },
    {
      invariantKind: "departure",
      statement: "A row drawn more than once is said to Alan once and named on the channel.",
    },
    {
      invariantKind: "departure",
      statement: "The badge counts every row the panel drew whatever each row is.",
    },
    {
      invariantKind: "departure",
      statement: "The initiatives drawn and the intents drawn are counted apart from each other.",
    },
    {
      invariantKind: "absence",
      statement: "No watcher on a seat file or an initiative file is registered here.",
    },
    {
      invariantKind: "departure",
      statement: "The tree view is given the drag and drop the dragging module makes.",
    },
    {
      invariantKind: "departure",
      statement: "A manual refresh reads the file again rather than waiting to be told.",
    },
    {
      invariantKind: "departure",
      statement: "A file the service has not written leaves the rows drawn as they are.",
    },
    {
      invariantKind: "departure",
      statement: "A drop draws the rows in their new order before the move is made.",
    },
    {
      invariantKind: "departure",
      statement: "That order is held until the file has it or the move is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file with those intents in another order is drawn in the order held.",
    },
    {
      invariantKind: "departure",
      statement: "A file with other intents than those releases the order held.",
    },
    {
      invariantKind: "departure",
      statement: "A refused move reads the file again and draws what that file has.",
    },
    {
      invariantKind: "departure",
      statement: "An order held for one initiative leaves every other initiative alone.",
    },
    {
      invariantKind: "departure",
      statement: "How many rows the panel drew is said in the words the description module gives.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes the tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a row's appearance.",
    },
  ],
} as const satisfies Module
