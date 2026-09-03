import type { Alert } from "../alert.page-type.ts"

export const containerMemoryNearLimit = {
  id: "01a06755-62f9-7e03-bd69-9caced3fcadb",
  pageTypeSlug: "alert",
  slug: "container-memory-near-limit",
  title: "Container memory near limit",
  definition: "a container is using close to all the memory it is allowed",
  domain: "infrastructure",
  summary:
    "Container {{ $labels.namespace }}/{{ $labels.container }} peaked at {{ $value | humanizePercentage }} of its memory limit",
  description: "txt",
} as const satisfies Alert
