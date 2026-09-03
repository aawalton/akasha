export const NAMESPACE = "git"
export const APP_NAME = "git-transport"
const INSTANCE_NAME = "git"
const COMPONENT = "git-server"
const PART_OF = "git"
const MANAGED_BY = "deploy-script"

export const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

export const SELECTOR_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
} as const
