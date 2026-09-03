import type { Module } from "@akasha/code-system/module"

export const persistImage = {
  id: "01a0685d-4b35-7013-8853-9ed4e36a99e3",
  pageTypeSlug: "module",
  slug: "persist-image",
  definition: "the image page a generate, edit or upscale run lands, and the cover it is given",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a generate, edit or upscale run lands an image.",
    },
    {
      invariantKind: "departure",
      statement: "The engine is read from the operation first and from the service second.",
    },
    {
      invariantKind: "departure",
      statement: "The cover is set after the bytes are stored rather than before.",
    },
  ],
} as const satisfies Module
