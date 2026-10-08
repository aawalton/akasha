import type { Secret } from "akasha/infrastructure/service/akasha-service/secret/secret.page-type.types.ts"

export const tailnetEgressAuth = {
  id: "01a06832-cf2d-7529-a1f2-e92dbf1db468",
  type: "page-type/secret",
  slug: "tailnet-egress-auth",
  placements: [{ resourceName: "tailnet-egress-auth", resourceKey: "TS_AUTHKEY" }],
  createdAt: "2026-09-03T16:55:55.437Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies Secret
