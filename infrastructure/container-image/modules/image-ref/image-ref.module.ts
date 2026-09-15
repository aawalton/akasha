import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imageRef = {
  id: "01a08da3-e007-78c2-aa15-9ce06319c982",
  type: "module",
  slug: "image-ref",
  definition: "the name and tag a built image is pushed and pulled under",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tag is the hash of what the image was built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image the cluster pulls is named the same way it was pushed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds or pushes an image.",
    },
  ],
} as const satisfies Module
