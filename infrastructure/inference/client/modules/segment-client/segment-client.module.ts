import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const segmentClient = {
  id: "01a0682d-8ef5-7005-81a3-8cc746c8acbf",
  type: "page-type/module",
  slug: "segment-client",
  definition: "an image's foreground parted from its background by the rembg service",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is carried as multipart form data named `image`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The service answers a matte or a cutout or a flattened image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer whose content type is not `image/png` is at fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sibling output keeps the matte's extension and takes a suffix before that extension.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A matte named with no extension gives its siblings `.png`.",
    },
  ],
  createdAt: "2026-09-03T16:50:11.317Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
