import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeDragging = {
  id: "01a081e8-84f4-78f4-89ef-3f3d801114cb",
  pageTypeSlug: "module",
  type: "module",
  slug: "work-tree-dragging",
  definition: "the row dragged in the work tree read as one intent's new place",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is dragged through the drag and drop the tree view already gives.",
    },
    {
      invariantKind: "departure",
      statement: "The drag is carried under the name the editor gives a tree of this view's name.",
    },
    {
      invariantKind: "departure",
      statement: "One row is dragged at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A row's initiative and place are read off the key that row has.",
    },
    {
      invariantKind: "departure",
      statement: "A key is its initiative's slug, a mark, and the place counted from one.",
    },
    {
      invariantKind: "departure",
      statement: "A drop moves an intent onto an intent of the same initiative and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A drop onto the place the dragged intent sits at already moves nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A drop over no row at all moves nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The move is made by the command that moves an intent.",
    },
    {
      invariantKind: "departure",
      statement: "A move that failed is said to Alan once and written to the panel's channel.",
    },
    {
      invariantKind: "departure",
      statement: "The editor is handed in rather than imported, so a test runs outside the editor.",
    },
    {
      invariantKind: "departure",
      statement: "An intent is followed between two orders by its statement rather than its key.",
    },
    {
      invariantKind: "departure",
      statement: "The intents reordered are renumbered from one in their new order.",
    },
    {
      invariantKind: "departure",
      statement: "The rows beneath an initiative that are no intent keep their places.",
    },
    {
      invariantKind: "departure",
      statement: "An order with the same intents in another order is stale rather than gone.",
    },
    {
      invariantKind: "departure",
      statement: "An order with other intents is gone rather than stale.",
    },
    {
      invariantKind: "departure",
      statement: "Rows are composed here and handed back rather than given to the editor.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the initiative's page.",
    },
    {
      invariantKind: "departure",
      statement: "A drop tells the panel to draw the new order before the move is made.",
    },
    {
      invariantKind: "departure",
      statement: "A drop returns before the command answers.",
    },
    {
      invariantKind: "departure",
      statement: "A refused move tells the panel to let the new order go.",
    },
  ],
} as const satisfies Module
