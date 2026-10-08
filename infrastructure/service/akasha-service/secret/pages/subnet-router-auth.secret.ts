import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const subnetRouterAuth = {
  id: "01a06832-cf2d-739c-b805-44e0c58b4757",
  type: "page-type/secret",
  slug: "subnet-router-auth",
  placements: [{ resourceName: "subnet-router-auth", resourceKey: "TS_AUTHKEY" }],
  createdAt: "2026-09-03T16:55:55.437Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
