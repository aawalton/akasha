import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const treeDrawing = {
  id: "01a07290-1f4c-7a63-9e21-58c0bd47e3f2",
  pageTypeSlug: "module",
  type: "module",
  slug: "tree-drawing",
  definition: "each tree the editor draws put into the one row every tree has",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A tree is built by the builder that already built the tree rather than by new code.",
    },
    {
      invariantKind: "departure",
      statement:
        "The pages tree spells a document as the checkout and the path inside parted by a colon.",
    },
    {
      invariantKind: "departure",
      statement: "A commands row has the words that command is called by.",
    },
    {
      invariantKind: "departure",
      statement: "A commands row has the definition that command's own page states.",
    },
    {
      invariantKind: "departure",
      statement: "Every row of every tree has the same four names for the same four facts.",
    },
    {
      invariantKind: "departure",
      statement: "A row names a document by a whole path rather than a path the editor must join.",
    },
    {
      invariantKind: "departure",
      statement: "A row that opens no document names none.",
    },
    {
      invariantKind: "departure",
      statement: "A domains row has its champion as the description the panel draws.",
    },
    {
      invariantKind: "departure",
      statement: "A work row has the kind that row is among the work tree's two kinds.",
    },
    {
      invariantKind: "departure",
      statement: "The subagents under a seat are the subagent pages naming that seat.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent page is joined onto its seat's row through the seat's name.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent page naming a seat no row answers to is left out.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent row is labelled by the kind that subagent was dispatched as.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent stating no kind is labelled by the id that subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement: "Every subagent hangs directly under its seat rather than under another subagent.",
    },
    {
      invariantKind: "departure",
      statement: "No seat is counted as unread.",
    },
    {
      invariantKind: "departure",
      statement: "Reading a seat's turn banks how far that seat's transcript was read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A field the builder adds reaches the editor only where the field is named here too.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock or watches a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts a child process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here folds a transcript for the subagents a seat is running.",
    },
  ],
} as const satisfies Module
