import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const certManagerWebhook = {
  id: "01a068e5-527c-7030-88b5-ece6202b1900",
  pageTypeSlug: "vendored-workload",
  slug: "cert-manager-webhook",
  title: "Cert manager webhook",
  definition: "what validates and converts cert-manager resources as they are written",
  resourceKind: "Deployment",
  namespace: "cert-manager",
  resourceName: "cert-manager-webhook",
} as const satisfies VendoredWorkload
