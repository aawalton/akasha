import type { FileProperty } from "@akasha/pages-system/file-property"

export type ModelManifest = "json"

export const modelManifest = {
  id: "01a06d3b-743f-7cf0-8f82-5c0f41cfeaf0",
  pageTypeSlug: "file-property",
  slug: "model-manifest",
  propertySlug: "model-manifest",
  definition: "what a trained parser says about itself",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The manifest names the classes and the relations the model can answer with.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest names the checkpoint the model came from.",
    },
    {
      invariantKind: "departure",
      statement: "The manifest is kept outside the commit.",
    },
  ],
} as const satisfies FileProperty
