import type { VendoredWorkload } from "../vendored-workload.page-type.ts"

export const barmanCloud = {
  id: "01a068e5-527c-7342-9656-a0172825938d",
  pageTypeSlug: "vendored-workload",
  slug: "barman-cloud",
  title: "Barman cloud",
  definition: "what ships Postgres backups and write-ahead logs to object storage",
  resourceKind: "Deployment",
  namespace: "cnpg-system",
  resourceName: "barman-cloud",
} as const satisfies VendoredWorkload
