import type { Alert } from "../alert.page-type.ts"

export const domainRegistrationExpiringSoon = {
  id: "01a06755-62f9-72fc-8b06-943ba15ce158",
  pageTypeSlug: "alert",
  slug: "domain-registration-expiring-soon",
  title: "Domain registration expiring soon",
  definition: "a domain name's registration is close to expiring",
  domain: "infrastructure",
  summary: "Domain {{ $labels.domain }} registration expires in {{ $value | humanizeDuration }}",
  description: "txt",
} as const satisfies Alert
