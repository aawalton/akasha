import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const certManager = {
  id: "01a068e5-527c-7785-80d9-e385e21d4690",
  type: "page-type/vendored-workload",
  slug: "cert-manager",
  title: "Cert manager",
  definition: "what issues and renews the TLS certificates the cluster serves",
  resourceKind: "Deployment",
  namespace: "cert-manager",
  resourceName: "cert-manager",
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
