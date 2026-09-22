import { synthMulti } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { HOSTNAME_KEY } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import { auditCache } from "akasha/infrastructure/job/audit-cache/audit-cache.manifest.ts"
import {
  FASTEST,
  JOB_NAMESPACE,
} from "akasha/infrastructure/job/modules/cluster-running/cluster-running.module.code.ts"

const AUDIT_CACHE_PATH = "/var/lib/audit-cache"

const ROOM = "50Gi"

const NO_CLASS = ""

const WHOLE = "Filesystem"

const ONE_WRITER = "ReadWriteOnce"

const KEPT = "Retain"

const MADE_IF_ABSENT = "DirectoryOrCreate"

function diskYaml(): string {
  return synthMulti(auditCache.slug, [
    {
      id: "persistent-volume",
      manifest: {
        apiVersion: "v1",
        kind: "PersistentVolume",
        metadata: { name: auditCache.slug },
        spec: {
          capacity: { storage: ROOM },
          volumeMode: WHOLE,
          accessModes: [ONE_WRITER],
          persistentVolumeReclaimPolicy: KEPT,
          storageClassName: NO_CLASS,
          hostPath: { path: AUDIT_CACHE_PATH, type: MADE_IF_ABSENT },
          claimRef: { namespace: JOB_NAMESPACE, name: auditCache.slug },
          nodeAffinity: {
            required: {
              nodeSelectorTerms: [
                { matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: [FASTEST] }] },
              ],
            },
          },
        },
      },
    },
    {
      id: "persistent-volume-claim",
      manifest: {
        apiVersion: "v1",
        kind: "PersistentVolumeClaim",
        metadata: { name: auditCache.slug, namespace: JOB_NAMESPACE },
        spec: {
          accessModes: [ONE_WRITER],
          storageClassName: NO_CLASS,
          volumeName: auditCache.slug,
          resources: { requests: { storage: ROOM } },
        },
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: auditCache.slug, yaml: diskYaml() }]
}
