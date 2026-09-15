import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rclone = {
  id: "01a06863-74ea-71ef-b9e2-e47a850c7d47",
  type: "module",
  slug: "rclone",
  definition: "the rclone commands a store is listed, read, copied and hashed through",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command that exits non-zero is an error carrying the text the command said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A copy of named files leaves behind no list of those names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The same commands reach a remote store and a local path.",
    },
  ],
} as const satisfies Module
