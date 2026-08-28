import { type KubernetesLabels, kubernetesLabels, selectorOf } from "@infra/k8s-types/labels"

export const NAMESPACE = "seaweedfs"
const APP_NAME = "seaweedfs"
const INSTANCE_NAME = "seaweedfs"
const PART_OF = "cluster-object-store"
const MANAGED_BY = "bootstrap"

export const IMAGE = "chrislusf/seaweedfs:3.73"
export const HOST = "node-04"

export const ASSETS_BUCKET = "agent-sessions"

export const EXPIRING_PREFIXES = ["sessions"] as const

export const NON_EXPIRING_PREFIXES = [
  "audio",
  "images",
  "media-renders",
  "persona-images",
  "persona-voices",
  "story-audio",
] as const

const COMPONENT_OBJECT_STORE = "object-store"
export const COMPONENT_MASTER = "master"
export const COMPONENT_VOLUME = "volume"
export const COMPONENT_FILER = "filer"
export const COMPONENT_S3_GATEWAY = "s3-gateway"

export const NAMESPACE_LABELS = kubernetesLabels({
  name: APP_NAME,
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export const STORAGE_LABELS = kubernetesLabels({
  name: APP_NAME,
  instance: INSTANCE_NAME,
  component: COMPONENT_OBJECT_STORE,
  partOf: PART_OF,
  managedBy: MANAGED_BY,
})

export function componentLabels(component: string): KubernetesLabels {
  return kubernetesLabels({
    name: APP_NAME,
    instance: INSTANCE_NAME,
    component,
    partOf: PART_OF,
    managedBy: MANAGED_BY,
  })
}

export function selectorLabels(component: string): KubernetesLabels {
  return selectorOf(componentLabels(component), "name-instance-component")
}

export const FILER_MEMORY_LIMIT_MIB = 2048
const FILER_MEMORY_RESERVE_MIB = 384
export const FILER_GOMEMLIMIT_MIB = FILER_MEMORY_LIMIT_MIB - FILER_MEMORY_RESERVE_MIB

export const MASTER_HTTP_PORT = 9333
export const MASTER_GRPC_PORT = 19333
export const VOLUME_HTTP_PORT = 8080
export const VOLUME_GRPC_PORT = 18080
export const FILER_HTTP_PORT = 8888
export const FILER_GRPC_PORT = 18888
export const S3_GATEWAY_HTTP_PORT = 8333
export const METRICS_PORT = 9327

export const MASTER_ADDRESS = `master.${NAMESPACE}.svc.cluster.local:${MASTER_HTTP_PORT}`
export const FILER_ADDRESS = `filer.${NAMESPACE}.svc.cluster.local:${FILER_HTTP_PORT}`
export const S3_GATEWAY_ENDPOINT = `http://s3-gateway.${NAMESPACE}.svc.cluster.local:${S3_GATEWAY_HTTP_PORT}`
