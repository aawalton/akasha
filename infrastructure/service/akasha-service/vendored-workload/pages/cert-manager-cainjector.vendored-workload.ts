import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const certManagerCainjector = {
  id: "01a068e5-527c-73ac-8664-2c8bb2697205",
  type: "page-type/vendored-workload",
  slug: "cert-manager-cainjector",
  title: "Cert manager cainjector",
  definition: "what copies a CA bundle into the resources that must trust it",
  resourceKind: "Deployment",
  namespace: "cert-manager",
  resourceName: "cert-manager-cainjector",
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
