import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { HOSTNAME_KEY } from "@infra/k8s-types/hostnames"
import { APP_NAME, NAMESPACE, RESOURCE_LABELS, SELECTOR_LABELS } from "./synth-constants"
import { deploymentYaml } from "./synth-deployment"

function namespaceYaml(): string {
  return synthOne(NAMESPACE, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: NAMESPACE,
      labels: {
        "kubernetes.io/metadata.name": NAMESPACE,
      },
    },
  })
}

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
    { name: "namespace", yaml: namespaceYaml() },
    { name: "pv", yaml: pvYaml() },
    { name: "pvc", yaml: pvcYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
  ]
}
