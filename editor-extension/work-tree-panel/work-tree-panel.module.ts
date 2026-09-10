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
      statement: "The menu over a row is answered by the deleting module the panel registers.",
    },
    {
      invariantKind: "departure",
      statement: "A deletion says what it said on the same channel a drop says on.",
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
      statement: "An intent deleted is drawn away before the command deleting it answers.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative deleted is drawn away with its intents before that command answers.",
    },
    {
      invariantKind: "departure",
      statement:
        "An intent dropped onto another initiative leaves the initiative handing it at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "That intent reaches the initiative taking it when the file the service writes has it.",
    },
    {
      invariantKind: "departure",
      statement: "A drop, a hand and a deletion are held for an initiative in one place.",
    },
    {
      invariantKind: "departure",
      statement: "What is held is held until the file has it or the command is refused.",
    },
    {
      invariantKind: "departure",
      statement: "What is held is let go once every command it waits on has answered.",
    },
    {
      invariantKind: "departure",
      statement: "A file disagreeing after those commands answered is drawn as that file has it.",
    },
    {
      invariantKind: "departure",
      statement: "A command answering draws nothing of itself.",
    },
    {
      invariantKind: "departure",
      statement: "A file with those intents in another order is drawn in the order held.",
    },
    {
      invariantKind: "departure",
      statement: "A file still holding an intent held to be going is drawn without that intent.",
    },
    {
      invariantKind: "departure",
      statement: "A file with other intents than those releases what is held.",
    },
    {
      invariantKind: "departure",
      statement: "A refused move or deletion reads the file again and draws what that file has.",
    },
    {
      invariantKind: "departure",
      statement: "What is held for one initiative leaves every other initiative alone.",
    },
    {
      invariantKind: "departure",
      statement: "A row is deleted by the slug and the statement that row is drawn with.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row deleted while another deletion is settling names the intent that row is drawn as.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row dragged while a deletion is settling names the intent that row is drawn as.",
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
