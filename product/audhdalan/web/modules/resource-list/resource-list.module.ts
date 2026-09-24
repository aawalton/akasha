import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const resourceList = {
  id: "01a06558-c2cc-7004-83e1-2eea1213cc29",
  type: "page-type/module",
  slug: "resource-list",
  definition: "the outside places a reader is pointed to, each with its own icon",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The places are the links a site document's markdown list names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place's icon is chosen here by the address it links to.",
    },
  ],
} as const satisfies Module
