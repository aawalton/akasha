import type { Alert } from "../alert.page-type.ts"

export const lokiRequestErrorRateHigh = {
  id: "01a06755-62fa-7253-9300-43463c53ede3",
  pageTypeSlug: "alert",
  slug: "loki-request-error-rate-high",
  title: "Loki request error rate high",
  definition: "Loki is failing a large share of the requests it is given",
  domain: "infrastructure",
  summary: "'Loki is returning 5xx on {{ $value | printf \"%.1f\" }}% of requests'",
  description: "txt",
} as const satisfies Alert
