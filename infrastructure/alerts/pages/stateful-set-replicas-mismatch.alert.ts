import type { Alert } from "../alert.page-type.ts"

export const statefulSetReplicasMismatch = {
  id: "01a06755-62fb-7f40-941a-70c89ba8b600",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "stateful-set-replicas-mismatch",
  title: "Stateful set replicas mismatch",
  definition: "a stateful set has been running fewer replicas than it asks for",
  domain: "infrastructure",
  summary: "StatefulSet {{ $labels.namespace }}/{{ $labels.statefulset }} replicas mismatch",
  runbook: "txt",
} as const satisfies Alert
