import type { Module } from "../../code-system/module/module.page-type.ts"

export const settling = {
  id: "01a04eb3-0e17-7660-850e-4311257ed9fa",
  pageTypeSlug: "module",
  slug: "settling",
  definition: "where a path lands once every link on it is followed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is judged by where it lands, never by how it is spelled.",
    },
    {
      invariantKind: "departure",
      statement: "A path settles even where nothing stands at the end of it yet.",
    },
    {
      invariantKind: "departure",
      statement: "A ring of links settles rather than running on.",
    },
    {
      invariantKind: "departure",
      statement: "A root holds itself.",
    },
  ],
} as const satisfies Module
