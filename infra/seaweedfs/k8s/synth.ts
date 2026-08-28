import { synthMulti, synthOne } from "@infra/k8s-types/cdk8s-synth"
import { HOSTNAME_KEY } from "@infra/k8s-types/hostnames"
import {
  backupBulkCronJobYaml,
  backupCnpgCronJobYaml,
  backupPvcYaml,
  backupPvYaml,
} from "../synth-backup"
import {
  COMPONENT_FILER,
  COMPONENT_MASTER,
  COMPONENT_S3_GATEWAY,
  COMPONENT_VOLUME,
  componentLabels,
  FILER_GRPC_PORT,
  FILER_HTTP_PORT,
  HOST,
  MASTER_GRPC_PORT,
  MASTER_HTTP_PORT,
  METRICS_PORT,
  NAMESPACE,
  NAMESPACE_LABELS,
  S3_GATEWAY_HTTP_PORT,
  STORAGE_LABELS,
  selectorLabels,
  VOLUME_GRPC_PORT,
  VOLUME_HTTP_PORT,
} from "../synth-constants"
import {
  filerDeploymentYaml,
  masterDeploymentYaml,
  s3GatewayDeploymentYaml,
  volumeDeploymentYaml,
} from "../synth-deployments"
import { etcdSnapshotCronJobYaml } from "../synth-etcd-snapshot"
import { backupAssetsCronJobYaml } from "../synth-longtail-assets"
import { maintenanceCronJobYaml } from "../synth-maintenance"
import { pruneSessionsCronJobYaml } from "../synth-prune"

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

function servicesYaml(): string {
  return synthMulti(NAMESPACE, [
    {
      id: "service-master",
      manifest: {
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
      },
    },
    {
      id: "service-volume",
      manifest: {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "volume",
          namespace: NAMESPACE,
          labels: componentLabels(COMPONENT_VOLUME),
        },
        spec: {
          type: "ClusterIP",
          ports: [
            { name: "http", port: VOLUME_HTTP_PORT, targetPort: VOLUME_HTTP_PORT },
            { name: "grpc", port: VOLUME_GRPC_PORT, targetPort: VOLUME_GRPC_PORT },
            { name: "metrics", port: METRICS_PORT, targetPort: METRICS_PORT },
          ],
          selector: selectorLabels(COMPONENT_VOLUME),
        },
      },
    },
    {
      id: "service-filer",
      manifest: {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "filer",
          namespace: NAMESPACE,
          labels: componentLabels(COMPONENT_FILER),
        },
        spec: {
          type: "ClusterIP",
          ports: [
            { name: "http", port: FILER_HTTP_PORT, targetPort: FILER_HTTP_PORT },
            { name: "grpc", port: FILER_GRPC_PORT, targetPort: FILER_GRPC_PORT },
            { name: "metrics", port: METRICS_PORT, targetPort: METRICS_PORT },
          ],
          selector: selectorLabels(COMPONENT_FILER),
        },
      },
    },
    {
      id: "service-s3-gateway",
      manifest: {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
          name: "s3-gateway",
          namespace: NAMESPACE,
          labels: componentLabels(COMPONENT_S3_GATEWAY),
        },
        spec: {
          type: "ClusterIP",
          ports: [
            {
              name: "http",
              port: S3_GATEWAY_HTTP_PORT,
              targetPort: S3_GATEWAY_HTTP_PORT,
            },
          ],
          selector: selectorLabels(COMPONENT_S3_GATEWAY),
        },
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "pv", yaml: pvYaml() },
    { name: "pvc", yaml: pvcYaml() },
    { name: "services", yaml: servicesYaml() },
    { name: "master", yaml: masterDeploymentYaml() },
    { name: "volume", yaml: volumeDeploymentYaml() },
    { name: "filer", yaml: filerDeploymentYaml() },
    { name: "s3-gateway", yaml: s3GatewayDeploymentYaml() },
    { name: "backup-pv", yaml: backupPvYaml() },
    { name: "backup-pvc", yaml: backupPvcYaml() },
    { name: "backup-cnpg", yaml: backupCnpgCronJobYaml() },
    { name: "backup-bulk", yaml: backupBulkCronJobYaml() },
    { name: "backup-assets", yaml: backupAssetsCronJobYaml() },
    { name: "prune-sessions", yaml: pruneSessionsCronJobYaml() },
    { name: "maintenance", yaml: maintenanceCronJobYaml() },
    { name: "etcd-snapshot", yaml: etcdSnapshotCronJobYaml() },
  ]
}
