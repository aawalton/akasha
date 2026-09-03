import type { Alert } from "../alert.page-type.ts"

export const domainRegistrationExpiryMetricAbsent = {
  id: "01a06755-62f9-728b-a173-bc576a971329",
  pageTypeSlug: "alert",
  slug: "domain-registration-expiry-metric-absent",
  title: "Domain registration expiry metric absent",
  definition: "nothing is reporting when the domain names expire",
  domain: "infrastructure",
  summary: "domain registration expiry gauge is absent",
  description: "txt",
} as const satisfies Alert
