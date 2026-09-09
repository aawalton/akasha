import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const commandTreeAssemble = {
  id: "01a07c93-3aad-7d0a-87f2-3f002f5aad39",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-tree-assemble",
  definition: "the namespaces and commands under the command page type, gathered into one tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree is the domain tree narrowed to commands and namespaces.",
    },
    {
      invariantKind: "departure",
      statement: "A page hangs where the page above names that page rather than by its hyphens.",
    },
    {
      invariantKind: "departure",
      statement: "The roots are the parts of the command page type.",
    },
    {
      invariantKind: "departure",
      statement: "A part of the command page type that is neither a command nor a namespace goes.",
    },
    {
      invariantKind: "departure",
      statement: "A row is labelled by the whole call that row is made by.",
    },
    {
      invariantKind: "departure",
      statement: "A label parts the words of a call by spaces rather than by hyphens.",
    },
    {
      invariantKind: "departure",
      statement: "A call written with spaces reaches the command the hyphens reach.",
    },
    {
      invariantKind: "departure",
      statement: "A row has the whole name the harness is called by.",
    },
    {
      invariantKind: "departure",
      statement: "The rows under one row are in alphabetical order.",
    },
    {
      invariantKind: "departure",
      statement: "A namespace is ordered among the commands rather than apart from the commands.",
    },
    {
      invariantKind: "departure",
      statement: "A row's detail is the definition its own page states.",
    },
    {
      invariantKind: "departure",
      statement: "A command or namespace no root reaches is named as unreached.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here walks the file system.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
