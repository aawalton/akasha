import type { Alert } from "../alert.page-type.ts"

export const certManagerCertNotReady = {
  id: "01a06755-62f9-760a-9e0d-94a487ad1a93",
  pageTypeSlug: "alert",
  slug: "cert-manager-cert-not-ready",
  title: "Cert manager cert not ready",
  definition: "cert-manager has a certificate it has not been able to make ready",
  domain: "infrastructure",
  summary: "TLS cert {{ $labels.namespace }}/{{ $labels.name }} is not Ready",
  description: "txt",
} as const satisfies Alert
