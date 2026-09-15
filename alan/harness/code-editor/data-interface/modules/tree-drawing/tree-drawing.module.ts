import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treeDrawing = {
  id: "01a07290-1f4c-7a63-9e21-58c0bd47e3f2",
  type: "page-type/module",
  slug: "tree-drawing",
  definition: "each tree the editor draws put into the one row every tree has",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A tree is built by the builder that already built the tree rather than by new code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages tree spells a document as the checkout and the path inside parted by a colon.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commands row has the words that command is called by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A commands row has the definition that command's own page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every row of every tree has the same four names for the same four facts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row names a document by a whole path rather than a path the editor must join.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row that opens no document names none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domains row has its champion as the description the panel draws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A work row has the kind that row is among the work tree's three kinds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree whose rows reach no single row of their own is given one to hang under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The row given that way is keyed `root` and carries the kind `root`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The row given that way is labelled by what the panel holding it is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The row given that way opens no document and has no color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The subagents under a seat are the subagent pages naming that seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent page is joined onto its seat's row through the seat's name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent page naming a seat no row answers to is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent row is labelled by the kind that subagent was dispatched as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent stating no kind is labelled by the id that subagent runs under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every subagent hangs directly under its seat rather than under another subagent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent row says whether that subagent was stopped from the panel.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No seat is counted as unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reading a seat's turn banks how far that seat's transcript was read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A field the builder adds reaches the editor only where the field is named here too.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock or watches a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here starts a child process.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here folds a transcript for the subagents a seat is running.",
    },
  ],
} as const satisfies Module
