import { gitTransport } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/git-transport/git-transport.service-cluster.ts"

export const NAMESPACE = gitTransport.namespace
export const APP_NAME = gitTransport.resourceName
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

export const JANITOR_LABELS = {
  "app.kubernetes.io/name": `${APP_NAME}-janitor`,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": "git-janitor",
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const
