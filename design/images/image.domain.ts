import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const image = {
  id: "01a06553-a9b6-7281-9f32-c3201ea4a802",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "image",
  definition: "making an image from text or from another image",
  pluralSlug: "images",
  parts: ["domain/z-image-turbo"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A model that makes images is a domain whose subject is that one model.",
    },
    {
      invariantKind: "departure",
      statement:
        "The settings a model is loaded and sampled with are code rather than a page property.",
    },
    {
      invariantKind: "departure",
      statement: "A page has the lessons learned by generating with the model.",
    },
  ],
} as const satisfies Domain
