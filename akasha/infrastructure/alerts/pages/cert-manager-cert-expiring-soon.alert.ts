import type { Alert } from "../alert.page-type.ts"

export const certManagerCertExpiringSoon = {
  id: "01a06755-62f9-784f-84c3-05b145215f8e",
  pageTypeSlug: "alert",
  slug: "cert-manager-cert-expiring-soon",
  title: "Cert manager cert expiring soon",
  definition: "a certificate cert-manager holds is close to expiring",
  domain: "infrastructure",
} as const satisfies Alert
