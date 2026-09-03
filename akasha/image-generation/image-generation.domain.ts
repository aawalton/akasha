import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const imageGeneration = {
  id: "01a06553-a9b6-7281-9f32-c3201ea4a802",
  pageTypeSlug: "domain",
  slug: "image-generation",
  definition: "making an image from text or from another image",
  partSlugs: ["domain/z-image-turbo"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A model that makes images is a domain whose subject is that one model.",
    },
    {
      invariantKind: "departure",
      statement: "What a model is loaded and sampled with is code rather than a page property.",
    },
    {
      invariantKind: "departure",
      statement: "What a page holds is what was learned by generating with the model.",
    },
  ],
} as const satisfies Domain
