import type { CertificateAuthority } from "akasha/infrastructure/network/certificate/authority/certificate-authority.page-type.types.ts"

export const clusterCa = {
  id: "01a0685e-1c21-7b95-8c04-9d5a6e2f31b7",
  type: "page-type/certificate-authority",
  slug: "cluster-ca",
  definition: "the authority signing the cluster's own certificates",
  authorityCertificate: "pem",
} as const satisfies CertificateAuthority
