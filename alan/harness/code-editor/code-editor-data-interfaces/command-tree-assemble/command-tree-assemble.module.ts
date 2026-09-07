import type { Module } from "../../../../../code-system/modules/module.page-type.ts"

export const commandTreeAssemble = {
  id: "01a07c93-3aad-7d0a-87f2-3f002f5aad39",
  pageTypeSlug: "module",
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
      statement: "A row is labelled by the segment that row adds to the name above.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose name does not open with the name above is labelled in full.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries the whole name the harness is called by.",
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
