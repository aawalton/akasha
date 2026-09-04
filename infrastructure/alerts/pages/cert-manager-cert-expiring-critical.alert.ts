import type { Alert } from "../alert.page-type.ts"

export const certManagerCertExpiringCritical = {
  id: "01a06755-62f9-78f1-bb5d-b36683699dc0",
  pageTypeSlug: "alert",
  slug: "cert-manager-cert-expiring-critical",
  title: "Cert manager cert expiring critical",
  definition:
    "a certificate cert-manager holds expires so soon that renewal has nearly run out of time",
  domain: "infrastructure",
} as const satisfies Alert
