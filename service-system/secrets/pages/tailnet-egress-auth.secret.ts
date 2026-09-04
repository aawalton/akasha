import type { Secret } from "../secret.page-type.ts"

export const tailnetEgressAuth = {
  id: "01a06832-cf2d-7529-a1f2-e92dbf1db468",
  pageTypeSlug: "secret",
  slug: "tailnet-egress-auth",
  resourceName: "tailnet-egress-auth",
  resourceKey: "TS_AUTHKEY",
} as const satisfies Secret
