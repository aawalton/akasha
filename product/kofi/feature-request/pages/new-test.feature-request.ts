import type { FeatureRequest } from "akasha/product/kofi/feature-request/feature-request.page-type.types.ts"

export const newTest = {
  id: "01a0c5e7-95fa-7259-a1aa-db4ea7af0258",
  type: "page-type/feature-request",
  slug: "new-test",
  title: "New Test",
  ask: "New Test",
  product: "domain/alan",
  boosts: [
    {
      contributor:
        "contributor/contributor-9bc4d42501098ce9fad8a73ad03e2ef5d1e89b4a1fac8426b100f7c4d7e5e3d4",
      points: 250,
    },
  ],
  standing: "published",
  proposer:
    "contributor/contributor-9bc4d42501098ce9fad8a73ad03e2ef5d1e89b4a1fac8426b100f7c4d7e5e3d4",
  createdAt: "2026-09-21T21:38:03.898Z",
  updatedAt: "2026-09-21T23:18:09.000Z",
} as const satisfies FeatureRequest
