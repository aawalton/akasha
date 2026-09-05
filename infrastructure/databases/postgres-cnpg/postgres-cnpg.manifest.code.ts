import { cnpgClusterYaml } from "@akasha/cluster-manifests/cnpg-cluster"
import { objectStoreYaml } from "@akasha/cluster-manifests/cnpg-object-store"
import { scheduledBackupYaml } from "@akasha/cluster-manifests/cnpg-scheduled-backup"
import { type ApiObjectManifest, synthMulti, synthOne } from "@akasha/k8s-types/cdk8s-synth"
import { HOSTNAME_KEY } from "@akasha/k8s-types/hostnames"

const NAMESPACE = "postgres"
const APP_NAME = "postgres"
const INSTANCE_NAME = "postgres"
const PART_OF = "postgres"
const MANAGED_BY = "bootstrap"

const NAMESPACE_LABELS = {
  "kubernetes.io/metadata.name": NAMESPACE,
} as const

const FULL_DATABASE_LABELS = {
  app: APP_NAME,
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": "database",
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const SERVICE_SELECTOR_LABELS = {
  "cnpg.io/cluster": "postgres-cnpg",
  "cnpg.io/instanceRole": "primary",
} as const

function namespaceYaml(): string {
  return synthOne(NAMESPACE, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: NAMESPACE,
      labels: NAMESPACE_LABELS,
    },
  })
}

const PV_HOST_PRIMARY = "node-02"
const PV_HOST_STANDBY = "node-03"

function pvYaml(): string {
  return synthMulti(NAMESPACE, [
    {
      id: "pv-data",
      manifest: hostPathPv(
        "postgres-cnpg-2-data",
        "100Gi",
        "/var/lib/postgres-data",
        PV_HOST_PRIMARY,
        {
          namespace: NAMESPACE,
          name: "postgres-cnpg-2",
        }
      ),
    },
    {
      id: "pv-wal",
      manifest: hostPathPv(
        "postgres-cnpg-2-wal",
        "20Gi",
        "/var/lib/postgres-wal",
        PV_HOST_PRIMARY,
        {
          namespace: NAMESPACE,
          name: "postgres-cnpg-2-wal",
        }
      ),
    },
    {
      id: "pv-data-standby",
      manifest: hostPathPv(
        "postgres-cnpg-3-data",
        "100Gi",
        "/var/lib/postgres-data",
        PV_HOST_STANDBY,
        {
          namespace: NAMESPACE,
          name: "postgres-cnpg-3",
        }
      ),
    },
    {
      id: "pv-wal-standby",
      manifest: hostPathPv(
        "postgres-cnpg-3-wal",
        "20Gi",
        "/var/lib/postgres-wal",
        PV_HOST_STANDBY,
        {
          namespace: NAMESPACE,
          name: "postgres-cnpg-3-wal",
        }
      ),
    },
  ])
}

function hostPathPv(
  name: string,
  storage: string,
  path: string,
  host: string,
  claimRef: { readonly namespace: string; readonly name: string }
): ApiObjectManifest {
  return {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name },
    spec: {
      capacity: { storage },
      volumeMode: "Filesystem",
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      storageClassName: "",
      hostPath: { path, type: "DirectoryOrCreate" },
      claimRef,
      nodeAffinity: {
        required: {
          nodeSelectorTerms: [
            { matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: [host] }] },
          ],
        },
      },
    },
  }
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "postgres-service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "postgres",
      namespace: NAMESPACE,
      labels: FULL_DATABASE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SERVICE_SELECTOR_LABELS,
      ports: [
        {
          port: 5432,
          targetPort: 5432,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "postgres-cnpg-pv", yaml: pvYaml() },
    { name: "postgres-service", yaml: serviceYaml() },
    { name: "postgres-cnpg-cluster", yaml: cnpgClusterYaml() },
    { name: "postgres-cnpg-objectstore", yaml: objectStoreYaml() },
    { name: "postgres-cnpg-scheduledbackup", yaml: scheduledBackupYaml() },
  ]
}
