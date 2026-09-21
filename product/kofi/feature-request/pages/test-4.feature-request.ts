import type { FeatureRequest } from "akasha/product/kofi/feature-request/feature-request.page-type.types.ts"

export const test4 = {
  id: "01a0c5f2-d500-75c0-8220-215241c890d4",
  type: "page-type/feature-request",
  slug: "test-4",
  ask: "Test 4",
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
  title: "Test 4",
} as const satisfies FeatureRequest
