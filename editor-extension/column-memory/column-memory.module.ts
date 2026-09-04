import type { Module } from "../../code-system/modules/module.page-type.ts"

export const columnMemory = {
  id: "01a0686b-bfe9-77a5-a194-b6afcc2c2693",
  pageTypeSlug: "module",
  slug: "column-memory",
  definition: "the editor column each seat was last seen in, kept across windows and restarts",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat seen in no column leaves what was remembered for it standing.",
    },
    {
      invariantKind: "departure",
      statement: "A seat seen again is moved to the newest end of the memory.",
    },
    {
      invariantKind: "departure",
      statement: "Two hundred seats are remembered and the oldest beyond that is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "The memory is written only where a column changed or a seat was dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A stored memory that does not parse is read as none.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a terminal.",
    },
  ],
} as const satisfies Module
