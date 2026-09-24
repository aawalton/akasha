import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const homeDniParam = {
  id: "01a0655e-d399-7f57-a5ed-36dc75b69609",
  type: "page-type/module",
  slug: "home-dni-param",
  definition: "the home navigation item read out of a request",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A question the service refused is thrown rather than answered as no home item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The home screen opens on the first pinned nav item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "First is the order the sidebar draws, top items by place, each followed by the items beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The home screen opens on the first nav item where no nav item is pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Null is answered only where the service answered and no nav item names the app.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The nav item is answered as the param its href carries rather than as its id.",
    },
  ],
} as const satisfies Module
