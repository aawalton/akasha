import type { Secret } from "../secret.page-type.ts"

export const subnetRouterAuth = {
  id: "01a06832-cf2d-739c-b805-44e0c58b4757",
  pageTypeSlug: "secret",
  slug: "subnet-router-auth",
  resourceName: "subnet-router-auth",
  resourceKey: "TS_AUTHKEY",
} as const satisfies Secret
