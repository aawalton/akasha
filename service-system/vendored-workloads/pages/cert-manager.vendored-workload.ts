import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const certManager = {
  id: "01a068e5-527c-7785-80d9-e385e21d4690",
  pageTypeSlug: "vendored-workload",
  slug: "cert-manager",
  title: "Cert manager",
  definition: "what issues and renews the TLS certificates the cluster serves",
  resourceKind: "Deployment",
  namespace: "cert-manager",
  resourceName: "cert-manager",
} as const satisfies VendoredWorkload
