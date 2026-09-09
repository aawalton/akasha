import { synthOne } from "akasha/infrastructure/cluster/k8s-types/cdk8s-synth/cdk8s-synth.module.code.ts"
import { HOSTNAME_KEY } from "akasha/infrastructure/cluster/k8s-types/hostnames/hostnames.module.code.ts"
import { namespaceYaml } from "akasha/infrastructure/cluster/k8s-types/k8s-namespace/k8s-namespace.module.code.ts"
import { deploymentYaml } from "../transport-deployment/transport-deployment.module.code.ts"
import {
  APP_NAME,
  NAMESPACE,
  RESOURCE_LABELS,
  SELECTOR_LABELS,
} from "../transport-naming/transport-naming.module.code.ts"

function pvYaml(): string {
  return synthOne(NAMESPACE, "data-pv", {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name: "git-transport-data", labels: RESOURCE_LABELS },
    spec: {
      capacity: { storage: "5Gi" },
      volumeMode: "Filesystem",
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      storageClassName: "",
      local: { path: "/var/mnt/git-transport" },
      nodeAffinity: {
        required: {
          nodeSelectorTerms: [
            {
              matchExpressions: [{ key: HOSTNAME_KEY, operator: "In", values: ["node-03"] }],
            },
          ],
        },
      },
    },
  })
}

function pvcYaml(): string {
  return synthOne(NAMESPACE, "data-pvc", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: { name: "git-transport-data", namespace: NAMESPACE, labels: RESOURCE_LABELS },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: "",
      volumeName: "git-transport-data",
      resources: { requests: { storage: "5Gi" } },
    },
  })
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: APP_NAME,
      namespace: NAMESPACE,
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "ClusterIP",
      selector: SELECTOR_LABELS,
      ports: [
        {
          name: "http",
          port: 3000,
          targetPort: 3000,
          protocol: "TCP",
        },
      ],
    },
  })
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    {
      name: "namespace",
      yaml: namespaceYaml(NAMESPACE, { "kubernetes.io/metadata.name": NAMESPACE }),
    },
    { name: "pv", yaml: pvYaml() },
    { name: "pvc", yaml: pvcYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
