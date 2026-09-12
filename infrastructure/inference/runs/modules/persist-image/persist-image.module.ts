import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const persistImage = {
  id: "01a0685d-4b35-7013-8853-9ed4e36a99e3",
  type: "module",
  slug: "persist-image",
  definition: "the image page a generate, edit or upscale run lands, and the cover it is given",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a generate or edit or upscale run lands an image.",
    },
    {
      invariantKind: "departure",
      statement: "The engine is read from the operation first and from the service second.",
    },
    {
      invariantKind: "departure",
      statement: "The cover is set after the bytes are stored rather than before.",
    },
    {
      invariantKind: "departure",
      statement: "The object put and the cover set are each pushed into the caller's `done`.",
    },
  ],
} as const satisfies Module
