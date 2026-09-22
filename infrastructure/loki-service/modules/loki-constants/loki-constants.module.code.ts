export const NAMESPACE = "loki"

export const DATA_NODE = "node-02"
export const DATA_HOST_PATH = "/var/lib/loki-data"
export const DATA_CAPACITY = "10Gi"

export const NAMESPACE_LABELS = {
  "app.kubernetes.io/name": "loki",
  "app.kubernetes.io/managed-by": "bootstrap",
} as const

export const LOKI_LABELS = {
  "app.kubernetes.io/name": "loki",
  "app.kubernetes.io/instance": "loki",
  "app.kubernetes.io/component": "log-aggregation",
  "app.kubernetes.io/part-of": "monitoring",
  "app.kubernetes.io/managed-by": "deploy-script",
} as const

export const LOKI_SELECTOR_LABELS = {
  "app.kubernetes.io/name": "loki",
  "app.kubernetes.io/instance": "loki",
} as const

export const PROMTAIL_LABELS = {
  "app.kubernetes.io/name": "promtail",
  "app.kubernetes.io/instance": "loki",
  "app.kubernetes.io/component": "log-shipping",
  "app.kubernetes.io/part-of": "monitoring",
  "app.kubernetes.io/managed-by": "deploy-script",
} as const

export const PROMTAIL_SELECTOR_LABELS = {
  "app.kubernetes.io/name": "promtail",
  "app.kubernetes.io/instance": "loki",
} as const
