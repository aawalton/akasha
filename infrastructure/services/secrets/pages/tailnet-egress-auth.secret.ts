import type { Secret } from "akasha/infrastructure/services/secrets/secret.page-type.types.ts"

export const tailnetEgressAuth = {
  id: "01a06832-cf2d-7529-a1f2-e92dbf1db468",
  type: "secret",
  slug: "tailnet-egress-auth",
  placements: [{ resourceName: "tailnet-egress-auth", resourceKey: "TS_AUTHKEY" }],
} as const satisfies Secret
