import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const modelManifest = {
  id: "01a06d3b-743f-7cf0-8f82-5c0f41cfeaf0",
  type: "page-type/file-property",
  slug: "model-manifest",
  propertySlug: "model-manifest",
  definition: "what a trained parser says about itself",
  extensions: ["json"],
  generated: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest names the classes and the relations the model can answer with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest names the checkpoint the model came from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The manifest is kept outside the commit.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
