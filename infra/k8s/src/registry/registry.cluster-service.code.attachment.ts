import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { HOSTNAME_KEY, workloadClassMemberSelector } from "@infra/k8s-types/hostnames"
import { APP_NAME, INSTANCE_NAME, MANAGED_BY, NAMESPACE, PART_OF } from "./synth-constants"

const REGISTRY_IMAGE = "registry:3.0.0"

const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": "registry",
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const SELECTOR_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
} as const

const SERVICE_SELECTOR_LABELS = {
  ...SELECTOR_LABELS,
  "app.kubernetes.io/component": "registry",
} as const

const NAMESPACE_LABELS = {
  "kubernetes.io/metadata.name": NAMESPACE,
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

function pvYaml(): string {
  return synthOne(NAMESPACE, "registry-data-pv", {
    apiVersion: "v1",
    kind: "PersistentVolume",
    metadata: { name: "registry-data", labels: RESOURCE_LABELS },
    spec: {
      capacity: { storage: "50Gi" },
      volumeMode: "Filesystem",
      accessModes: ["ReadWriteOnce"],
      persistentVolumeReclaimPolicy: "Retain",
      storageClassName: "",
      local: { path: "/var/mnt/registry" },
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
  return synthOne(NAMESPACE, "registry-data-pvc", {
    apiVersion: "v1",
    kind: "PersistentVolumeClaim",
    metadata: {
      name: "registry-data",
      labels: RESOURCE_LABELS,
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      storageClassName: "",
      volumeName: "registry-data",
      resources: {
        requests: {
          storage: "50Gi",
        },
      },
    },
  })
}

function deploymentYaml(): string {
  return synthOne(NAMESPACE, "deployment", {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "registry",
      labels: RESOURCE_LABELS,
    },
    spec: {
      replicas: 1,
      strategy: { type: "Recreate" },
      selector: { matchLabels: SELECTOR_LABELS },
      template: {
        metadata: {
          labels: RESOURCE_LABELS,
        },
        spec: {
          securityContext: {
            fsGroup: 1000,
            fsGroupChangePolicy: "OnRootMismatch",
          },
          nodeSelector: workloadClassMemberSelector("build"),
          containers: [
            {
              name: "registry",
              image: REGISTRY_IMAGE,
              env: [{ name: "REGISTRY_STORAGE_DELETE_ENABLED", value: "true" }],
              ports: [{ containerPort: 5000, protocol: "TCP" }],
              volumeMounts: [{ name: "data", mountPath: "/var/lib/registry" }],
              lifecycle: {
                preStop: {
                  exec: {
                    command: ["sleep", "5"],
                  },
                },
              },
              livenessProbe: {
                httpGet: {
                  path: "/v2/",
                  port: 5000,
                  scheme: "HTTP",
                },
                initialDelaySeconds: 10,
                periodSeconds: 30,
                timeoutSeconds: 5,
              },
              readinessProbe: {
                httpGet: {
                  path: "/v2/",
                  port: 5000,
                  scheme: "HTTP",
                },
                initialDelaySeconds: 5,
                periodSeconds: 10,
                timeoutSeconds: 5,
              },
              resources: {
                requests: { cpu: "100m", memory: "512Mi" },
                limits: { memory: "512Mi" },
              },
              securityContext: {
                runAsNonRoot: true,
                runAsUser: 1000,
                readOnlyRootFilesystem: true,
                allowPrivilegeEscalation: false,
                capabilities: { drop: ["ALL"] },
              },
            },
          ],
          volumes: [
            {
              name: "data",
              persistentVolumeClaim: {
                claimName: "registry-data",
              },
            },
          ],
        },
      },
    },
  })
}

function serviceYaml(): string {
  return synthOne(NAMESPACE, "service", {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "registry",
      labels: RESOURCE_LABELS,
    },
    spec: {
      type: "NodePort",
      selector: SERVICE_SELECTOR_LABELS,
      ports: [
        {
          port: 5000,
          targetPort: 5000,
          nodePort: 30500,
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
