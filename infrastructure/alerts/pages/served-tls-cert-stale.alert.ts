import type { Alert } from "../alert.page-type.ts"

export const servedTlsCertStale = {
  id: "01a087cb-1b19-7002-b28a-25d4ab8d634e",
  pageTypeSlug: "alert",
  slug: "served-tls-cert-stale",
  title: "Served TLS cert stale",
  definition: "a listener serves a certificate older than the one cert-manager has issued",
  domain: "infrastructure",
  summary:
    "{{ $labels.instance }} serves an older certificate than cert-manager issued for {{ $labels.namespace }}/{{ $labels.name }}",
  runbook: "txt",
} as const satisfies Alert
