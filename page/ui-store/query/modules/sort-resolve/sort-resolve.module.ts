import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sortResolve = {
  id: "01a05b69-4550-734f-b117-9948906f14a9",
  type: "page-type/module",
  slug: "sort-resolve",
  definition: "the value a page row sorts by under a key",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key `random` sorts a page by a rank drawn from its id and a seed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser draws that seed once each time the app loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shuffle keeps its order while that load lasts and changes on the next load.",
    },
  ],
} as const satisfies Module
