import type { Alert } from "../alert.page-type.ts"

export const domainRegistrationExpiringCritical = {
  id: "01a06755-62f9-74d6-83b8-852ac0c74cc7",
  pageTypeSlug: "alert",
  slug: "domain-registration-expiring-critical",
  title: "Domain registration expiring critical",
  definition:
    "a domain name's registration expires so soon that renewal has nearly run out of time",
  domain: "infrastructure",
  summary: "Domain {{ $labels.domain }} expires in {{ $value | humanizeDuration }} (<7d)",
  description: "txt",
} as const satisfies Alert
