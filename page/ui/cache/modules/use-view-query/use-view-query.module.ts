import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useViewQuery = {
  id: "01a05cce-25ec-7ff7-96b3-5aee97f05806",
  type: "page-type/module",
  slug: "use-view-query",
  definition: "the rows a view asks for, held live against the local store",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view shows no row until its own question has been answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view answered before shows the rows it last held while it is read again.",
    },
  ],
} as const satisfies Module
