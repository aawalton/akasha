import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const certManagerCainjector = {
  id: "01a068e5-527c-73ac-8664-2c8bb2697205",
  pageTypeSlug: "vendored-workload",
  slug: "cert-manager-cainjector",
  title: "Cert manager cainjector",
  definition: "what copies a CA bundle into the resources that must trust it",
  resourceKind: "Deployment",
  namespace: "cert-manager",
  resourceName: "cert-manager-cainjector",
} as const satisfies VendoredWorkload
