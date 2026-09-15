import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settling = {
  id: "01a04eb3-0e17-7660-850e-4311257ed9fa",
  type: "module",
  slug: "settling",
  definition: "where a path lands once every link on it is followed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is judged by where the path lands rather than by how the path is spelled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path settles even where nothing is at the end of the path yet.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ring of links settles rather than running on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root has itself.",
    },
  ],
} as const satisfies Module
