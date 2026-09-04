import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rclone = {
  id: "01a06863-74ea-71ef-b9e2-e47a850c7d47",
  pageTypeSlug: "module",
  slug: "rclone",
  definition: "the rclone commands a store is listed, read, copied and hashed through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command that exits non-zero is an error carrying what the command said.",
    },
    {
      invariantKind: "departure",
      statement: "A copy of named files leaves behind no list of those names.",
    },
    {
      invariantKind: "departure",
      statement: "The same commands reach a remote store and a local path.",
    },
  ],
} as const satisfies Module
