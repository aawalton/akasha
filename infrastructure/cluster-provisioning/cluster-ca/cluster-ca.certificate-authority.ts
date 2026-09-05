import type { CertificateAuthority } from "../../certificate-authorities/certificate-authority.page-type.ts"

export const clusterCa = {
  id: "01a0685e-1c21-7b95-8c04-9d5a6e2f31b7",
  pageTypeSlug: "certificate-authority",
  slug: "cluster-ca",
  definition: "the authority the cluster's own certificates are signed by",
  authorityCertificate: "pem",
} as const satisfies CertificateAuthority
