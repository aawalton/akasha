import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const comfyGraph = {
  id: "01a06810-0b68-7ef9-b759-c81fe48c15c6",
  type: "page-type/module",
  slug: "comfy-graph",
  definition: "the nodes and links making up a ComfyUI workflow",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A node is reached by the key the graph has that node under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A link is the node that link comes from paired with the slot that link comes out of.",
    },
  ],
} as const satisfies Module
