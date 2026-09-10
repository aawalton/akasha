import type { Alert } from "../../alert.page-type.types.ts"

export const gpuTemperatureHigh = {
  id: "01a06755-62f9-7bd3-87dd-99ae05c91600",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "gpu-temperature-high",
  title: "GPU temperature high",
  definition: "a GPU is running hotter than it should be allowed to",
  domain: "infrastructure",
  summary: "GPU temperature > 85C on {{ $labels.instance }}",
  runbook: "txt",
} as const satisfies Alert
