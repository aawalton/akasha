import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imageRef = {
  id: "01a08da3-e007-78c2-aa15-9ce06319c982",
  type: "page-type/module",
  slug: "image-ref",
  definition: "a built image's name and tag for pushing and pulling",
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
  createdAt: "2026-09-10T23:25:22.311Z",
  updatedAt: "2026-09-22T13:59:20.000Z",
} as const satisfies Module
