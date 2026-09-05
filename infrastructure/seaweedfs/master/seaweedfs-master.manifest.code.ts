import { synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { HOSTNAME_KEY } from "@akasha/k8s-types/hostnames"
import {
  backupPvcYaml,
  backupPvYaml,
} from "../seaweedfs-backup-manifests/seaweedfs-backup-manifests.module.code.ts"
import {
  COMPONENT_MASTER,
  componentLabels,
  HOST,
  MASTER_GRPC_PORT,
  MASTER_HTTP_PORT,
  METRICS_PORT,
  NAMESPACE,
  NAMESPACE_LABELS,
  STORAGE_LABELS,
  selectorLabels,
} from "../seaweedfs-constants/seaweedfs-constants.module.code.ts"
import { masterDeploymentYaml } from "../seaweedfs-deployments/seaweedfs-deployments.module.code.ts"

const SHARED_BACKUP = "seaweedfs-backup"

function namespaceYaml(): string {
  return synthOne(NAMESPACE, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: { name: NAMESPACE, labels: NAMESPACE_LABELS },
  })
}

function pvYaml(): string {
  return synthOne(NAMESPACE, "pv", {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name: "seaweedfs-data", labels: STORAGE_LABELS },
    spec: {
      capacity: { storage: "500Gi" },
      volumeMode: "Filesystem",
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      storageClassName: "",
      local: { path: "/var/mnt/seaweedfs" },
      nodeAffinity: {
        required: {
          nodeSelectorTerms: [
            {
              matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: [HOST] }],
            },
          ],
        },
      },
    },
  })
}

function pvcYaml(): string {
  return synthOne(NAMESPACE, "pvc", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: "seaweedfs-data",
      namespace: NAMESPACE,
      labels: STORAGE_LABELS,
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: "",
      volumeName: "seaweedfs-data",
      resources: { requests: { storage: "500Gi" } },
    },
  })
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service-master", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "master",
      namespace: NAMESPACE,
      labels: componentLabels(COMPONENT_MASTER),
    },
    spec: {
      type: "ClusterIP",
      ports: [
        { name: "http", port: MASTER_HTTP_PORT, targetPort: MASTER_HTTP_PORT },
        { name: "grpc", port: MASTER_GRPC_PORT, targetPort: MASTER_GRPC_PORT },
        { name: "metrics", port: METRICS_PORT, targetPort: METRICS_PORT },
      ],
      selector: selectorLabels(COMPONENT_MASTER),
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "pv", yaml: pvYaml() },
    { name: "pvc", yaml: pvcYaml() },
    { name: "service", yaml: serviceYaml() },
    { name: "master", yaml: masterDeploymentYaml() },
    { name: "backup-pv", yaml: backupPvYaml(NAMESPACE, SHARED_BACKUP) },
    { name: "backup-pvc", yaml: backupPvcYaml(NAMESPACE, SHARED_BACKUP) },
  ]
}
