import type { Module } from "@akasha/code-system/module"

export const comfyGraph = {
  id: "01a06810-0b68-7ef9-b759-c81fe48c15c6",
  pageTypeSlug: "module",
  slug: "comfy-graph",
  definition: "the nodes and links a ComfyUI workflow is made of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node is reached by the key the graph holds it under.",
    },
    {
      invariantKind: "departure",
      statement: "A link is the node it comes from paired with the slot it comes out of.",
    },
  ],
} as const satisfies Module
