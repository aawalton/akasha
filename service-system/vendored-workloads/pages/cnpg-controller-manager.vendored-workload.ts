import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const cnpgControllerManager = {
  id: "01a068e5-527c-75fd-b83c-9d21a07b4077",
  pageTypeSlug: "vendored-workload",
  slug: "cnpg-controller-manager",
  title: "CNPG controller manager",
  definition: "what runs the Postgres clusters the CloudNativePG resources describe",
  resourceKind: "Deployment",
  namespace: "cnpg-system",
  resourceName: "cnpg-controller-manager",
} as const satisfies VendoredWorkload
