import type { Alert } from "../alert.page-type.ts"

export const certManagerCertExpiryMetricAbsent = {
  id: "01a06755-62f9-7946-98ea-7e85adabc2f5",
  pageTypeSlug: "alert",
  slug: "cert-manager-cert-expiry-metric-absent",
  title: "Cert manager cert expiry metric absent",
  definition: "nothing is reporting when cert-manager's certificates expire",
  domain: "infrastructure",
  summary: "cert-manager expiry gauge is absent — scrape lost or metric dead",
  description: "txt",
} as const satisfies Alert
