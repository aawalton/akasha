import type { FeatureRequest } from "akasha/product/kofi/feature-request/feature-request.page-type.types.ts"

export const test = {
  id: "01a0c51b-8050-7823-8b70-67176168e85d",
  type: "page-type/feature-request",
  slug: "test",
  ask: "Test",
  product: "domain/alan",
  boosts: [
    {
      contributor:
        "contributor/contributor-9bc4d42501098ce9fad8a73ad03e2ef5d1e89b4a1fac8426b100f7c4d7e5e3d4",
      points: 100,
    },
  ],
  standing: "proposed",
  proposer:
    "contributor/contributor-9bc4d42501098ce9fad8a73ad03e2ef5d1e89b4a1fac8426b100f7c4d7e5e3d4",
  title: "Test",
} as const satisfies FeatureRequest
