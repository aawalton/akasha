import type { Alert } from "../alert.page-type.ts"

export const deploymentReplicasMismatch = {
  id: "01a06755-62f9-7d75-afac-24b03a961811",
  pageTypeSlug: "alert",
  slug: "deployment-replicas-mismatch",
  title: "Deployment replicas mismatch",
  definition: "a deployment has been running fewer replicas than it asks for",
  domain: "infrastructure",
  summary: "Deployment {{ $labels.namespace }}/{{ $labels.deployment }} replicas mismatch",
  description: "txt",
} as const satisfies Alert
