import type { Module } from "@akasha/code-system/module"

export const segmentClient = {
  id: "01a0682d-8ef5-7005-81a3-8cc746c8acbf",
  pageTypeSlug: "module",
  slug: "segment-client",
  definition: "an image's foreground parted from its background by the rembg service",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The image is carried as multipart form data named `image`.",
    },
    {
      invariantKind: "departure",
      statement: "The service answers a matte, a cutout or a flattened image.",
    },
    {
      invariantKind: "departure",
      statement: "An answer whose content type is not `image/png` is at fault.",
    },
    {
      invariantKind: "departure",
      statement: "A sibling output keeps the matte's extension and takes a suffix before it.",
    },
    {
      invariantKind: "departure",
      statement: "A matte named with no extension gives its siblings `.png`.",
    },
  ],
} as const satisfies Module
