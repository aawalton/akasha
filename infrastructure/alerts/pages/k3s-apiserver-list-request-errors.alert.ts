import type { Alert } from "../alert.page-type.ts"

export const k3sApiserverListRequestErrors = {
  id: "01a06755-62fa-76b6-9995-9ef65d52174e",
  pageTypeSlug: "alert",
  slug: "k3s-apiserver-list-request-errors",
  title: "K3s apiserver list request errors",
  definition: "the k3s apiserver is failing list requests",
  domain: "infrastructure",
  summary: "k3s apiserver LIST requests returning 5xx for resource={{ $labels.resource }}",
  description: "txt",
} as const satisfies Alert
