import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const workTreeDragging = {
  id: "01a081e8-84f4-78f4-89ef-3f3d801114cb",
  pageTypeSlug: "module",
  type: "module",
  slug: "work-tree-dragging",
  definition: "the row dragged in the work tree read as one intent's new place or new initiative",
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
      statement: "A key is its initiative's slug and a mark and the place counted from `1`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A drop onto an intent of the same initiative moves the intent among that initiative's intents.",
    },
    {
      invariantKind: "departure",
      statement: "A drop onto the place the dragged intent sits at already moves nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A drop onto an intent of another initiative hands the intent to that initiative.",
    },
    {
      invariantKind: "departure",
      statement: "A drop onto another initiative's own row hands the intent to that initiative.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative stating no intent is reached by dropping onto its own row.",
    },
    {
      invariantKind: "departure",
      statement: "A drop onto the row of the initiative already stating the intent does nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Which row of an initiative a drop lands on sets no place among its intents.",
    },
    {
      invariantKind: "departure",
      statement: "The intent handed over is named by the statement its row is drawn under.",
    },
    {
      invariantKind: "departure",
      statement: "A drop over no row at all moves nothing and hands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The move is made by the command that moves an intent.",
    },
    {
      invariantKind: "departure",
      statement: "The hand is made by the command that hands an intent to another initiative.",
    },
    {
      invariantKind: "departure",
      statement: "A move that failed is said to Alan once and written to the panel's channel.",
    },
    {
      invariantKind: "departure",
      statement: "A hand that failed is said to Alan once and written to that same channel.",
    },
    {
      invariantKind: "departure",
      statement: "The editor is handed in rather than imported.",
    },
    {
      invariantKind: "departure",
      statement: "The harness call is handed in rather than imported.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the initiative's page.",
    },
    {
      invariantKind: "absence",
      statement: "No row is composed here.",
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
      statement: "A drop waits the ceiling the harness names rather than a ceiling named here.",
    },
    {
      invariantKind: "departure",
      statement: "A drop tells the panel the intent is leaving before the hand is made.",
    },
    {
      invariantKind: "departure",
      statement: "A refused move or hand tells the panel to let go of the hold.",
    },
    {
      invariantKind: "departure",
      statement: "A move or hand the command answered is told to the panel as answered.",
    },
    {
      invariantKind: "departure",
      statement: "The intent moved is named by the statement its row is drawn under.",
    },
    {
      invariantKind: "departure",
      statement: "The place the intent leaves is named to no command.",
    },
    {
      invariantKind: "departure",
      statement: "A row drawn under no label is moved nowhere and handed nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal saying a body moved between the read and the write is said to Alan as one sentence.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is known by the words the freshness rules close that refusal with.",
    },
    {
      invariantKind: "departure",
      statement: "The sentence said in place of that refusal is handed over rather than held here.",
    },
    {
      invariantKind: "departure",
      statement: "Every other refusal reaches Alan in the words that refusal was made in.",
    },
    {
      invariantKind: "departure",
      statement: "The channel is written the whole refusal whichever words Alan is shown.",
    },
  ],
} as const satisfies Module
