import type { Module } from "@akasha/code/module"

export const seatEntryPaths = {
  id: "01a08b87-db08-7b4d-8019-f88e7fd39f19",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-entry-paths",
  definition: "the files under the checkout a seat is started by running",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path here is written from the checkout rather than from the file reading it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or runs a process.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a Bun global.",
    },
  ],
} as const satisfies Module
