import type { VendoredWorkload } from "akasha/infrastructure/service/akasha-service/vendored-workload/vendored-workload.page-type.types.ts"

export const certManagerWebhook = {
  id: "01a068e5-527c-7030-88b5-ece6202b1900",
  type: "page-type/vendored-workload",
  slug: "cert-manager-webhook",
  title: "Cert manager webhook",
  definition: "what validates and converts cert-manager resources as they are written",
  resourceKind: "Deployment",
  namespace: "cert-manager",
  resourceName: "cert-manager-webhook",
  createdAt: "2026-09-03T20:10:54.460Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies VendoredWorkload
