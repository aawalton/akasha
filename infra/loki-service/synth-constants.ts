export const NAMESPACE = "loki"

export const S3_ENDPOINT = "s3-gateway.seaweedfs.svc.cluster.local:8333"
export const S3_BUCKET = "loki-chunks"
export const S3_SECRET_NAME = "loki-s3-creds"

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
