import { MAIN_NODES } from "../talos-nodes-main/talos-nodes-main.module.code.ts"
import { REHEARSAL_NODES } from "../talos-nodes-rehearsal/talos-nodes-rehearsal.module.code.ts"
import type { ClusterIntent, NodeIntent } from "../talos-schema/talos-schema.module.code.ts"

const REGISTRY_HOST = "registry.registry.svc.cluster.local:5000"

const ETCD_QUOTA_8GIB = 8_589_934_592

export const CLUSTERS: Readonly<Record<string, ClusterIntent>> = {
  main: {
    name: "main",
    talosVersion: "v1.12.9",
    controlPlaneVip: "192.168.68.239",
    podSubnet: "10.244.0.0/16",
    serviceSubnet: "10.96.0.0/12",
    allowSchedulingOnControlPlanes: true,
    registryHosts: [REGISTRY_HOST],
    registryMirrorEndpoints: [
      "http://192.168.68.75:30500",
      "http://192.168.68.90:30500",
      "http://192.168.68.93:30500",
    ],
    etcdQuotaBytes: ETCD_QUOTA_8GIB,
  },
  rehearsal: {
    name: "rehearsal",
    talosVersion: "v1.12.9",
    controlPlaneVip: "10.5.0.100",
    podSubnet: "10.244.0.0/16",
    serviceSubnet: "10.96.0.0/12",
    allowSchedulingOnControlPlanes: true,
    registryHosts: [REGISTRY_HOST],
    registryMirrorEndpoints: [],
  },
}

export const DEFAULT_CLUSTER_NAME = "main"

export const NODES: Readonly<Record<string, NodeIntent>> = {
  ...MAIN_NODES,
  ...REHEARSAL_NODES,
}

export function getCluster(name: string): ClusterIntent {
  const cluster = CLUSTERS[name]
  if (!cluster) {
    throw new Error(`unknown talos cluster: ${name} (known: ${Object.keys(CLUSTERS).join(", ")})`)
  }
  return cluster
}

export function getNode(id: string): NodeIntent {
  const node = NODES[id]
  if (!node) {
    throw new Error(`unknown talos node: ${id} (known: ${Object.keys(NODES).join(", ")})`)
  }
  return node
}

export function getClusterForNode(id: string): ClusterIntent {
  return getCluster(getNode(id).cluster)
}
