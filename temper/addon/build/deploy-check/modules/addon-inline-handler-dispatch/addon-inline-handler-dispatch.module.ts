import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonInlineHandlerDispatch = {
  id: "01a062a8-e76a-7191-8366-e4e515c97683",
  type: "page-type/module",
  slug: "addon-inline-handler-dispatch",
  definition: "whether an inline markup handler's body is one call to a named global and no more",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A body naming no governed namespace is not judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A body mentioning the namespace a second time is no single dispatch.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A body with anything after the closing bracket is no single dispatch.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A body starting anywhere but at the namespace is no single dispatch.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A handler whose body is blank is not judged.",
    },
  ],
  createdAt: "2026-09-02T15:07:11.594Z",
  updatedAt: "2026-09-21T22:03:34.000Z",
} as const satisfies Module
