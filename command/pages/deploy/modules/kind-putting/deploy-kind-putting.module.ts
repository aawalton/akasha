import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployKindPutting = {
  id: "01a15007-4a3d-7f6d-9f41-7daf674d1eb3",
  type: "page-type/module",
  slug: "deploy-kind-putting",
  definition: "the putting up of one thing, by the kind of thing it is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each kind is put up by the module that kind names, and nothing else here is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kind that pins a tree is put up from that tree, and every other from the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a call wants of a deploy is told apart here from what the call said.",
    },
  ],
  createdAt: "2026-10-18T17:20:17.468Z",
  updatedAt: "2026-10-18T17:20:17.468Z",
} as const satisfies Module
