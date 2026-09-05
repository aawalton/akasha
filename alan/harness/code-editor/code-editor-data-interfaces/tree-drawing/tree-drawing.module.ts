import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const treeDrawing = {
  id: "01a07290-1f4c-7a63-9e21-58c0bd47e3f2",
  pageTypeSlug: "module",
  slug: "tree-drawing",
  definition: "the work, domains and pages trees put into the one row every tree carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tree is built by the builder that already built it rather than by new code.",
    },
    {
      invariantKind: "departure",
      statement: "Every row of every tree carries the same four names for the same four facts.",
    },
    {
      invariantKind: "departure",
      statement: "A row names a document by a whole path rather than one the editor must join.",
    },
    {
      invariantKind: "departure",
      statement: "A row that opens no document names none.",
    },
    {
      invariantKind: "departure",
      statement: "A domains row carries its champion, which the panel makes the row's description.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock, watches a file or writes one.",
    },
  ],
} as const satisfies Module
