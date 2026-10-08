import type { FeatureRequest } from "akasha/product/kofi/feature-request/feature-request.page-type.types.ts"

export const test3 = {
  id: "01a0c5f1-0b62-7532-9d99-0e75cfc7022b",
  type: "page-type/feature-request",
  slug: "test-3",
  ask: "Test 3",
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
  title: "Test 3",
  createdAt: "2026-09-21T21:48:23.778Z",
  updatedAt: "2026-09-21T23:18:09.000Z",
} as const satisfies FeatureRequest
