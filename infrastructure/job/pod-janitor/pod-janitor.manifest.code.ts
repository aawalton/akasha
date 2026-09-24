import { synthMulti } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { synthNamespaceCronjob } from "akasha/infrastructure/cluster/k8s-type/modules/manifest-composing/manifest-composing.module.code.ts"
import { podJanitor } from "akasha/infrastructure/service/akasha-service/service-cluster/pages/pod-janitor/pod-janitor.service-cluster.ts"

const NAMESPACE = podJanitor.namespace
const APP_NAME = podJanitor.resourceName
const INSTANCE_NAME = "infra"
const COMPONENT = "gc"
const PART_OF = "infra"
const MANAGED_BY = "deploy-script"

const JANITOR_IMAGE = podJanitor.image

const DEFAULT_MIN_AGE_SECONDS = "3600"

const RESOURCE_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
  "app.kubernetes.io/part-of": PART_OF,
  "app.kubernetes.io/managed-by": MANAGED_BY,
} as const

const POD_LABELS = {
  "app.kubernetes.io/name": APP_NAME,
  "app.kubernetes.io/instance": INSTANCE_NAME,
  "app.kubernetes.io/component": COMPONENT,
} as const

const NAMESPACE_LABELS = {
  "kubernetes.io/metadata.name": NAMESPACE,
} as const

const JANITOR_SCRIPT = `set -eu

MIN_AGE_SECONDS="\${MIN_AGE_SECONDS:-${DEFAULT_MIN_AGE_SECONDS}}"
now="$(date +%s)"

echo "[pod-janitor] sweeping controller-owned Failed-phase pods older than \${MIN_AGE_SECONDS}s"

kubectl get pods --all-namespaces --field-selector=status.phase=Failed -o json > /tmp/failed-pods.json

jq -r --argjson now "\${now}" --argjson minAge "\${MIN_AGE_SECONDS}" '
  .items[]
  | select((.metadata.ownerReferences // []) | length > 0)
  | select(($now - (.metadata.creationTimestamp | fromdateiso8601)) >= $minAge)
  | "\\(.metadata.namespace) \\(.metadata.name)"
' /tmp/failed-pods.json | while read -r ns name; do
  [ -n "\${ns:-}" ] || continue
  echo "[pod-janitor] deleting \${ns}/\${name}"
  kubectl delete pod -n "\${ns}" "\${name}" --ignore-not-found
done

echo "[pod-janitor] sweep complete"
`

function cronjobYaml(): string {
  return synthMulti(NAMESPACE, [
    {
      id: "pod-janitor-sa",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: podJanitor.resourceName,
          namespace: NAMESPACE,
          labels: RESOURCE_LABELS,
        },
      },
    },
    {
      id: "pod-janitor-clusterrole",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "ClusterRole",
        metadata: {
          name: podJanitor.resourceName,
          labels: RESOURCE_LABELS,
        },
        rules: [{ apiGroups: [""], resources: ["pods"], verbs: ["get", "list", "delete"] }],
      },
    },
    {
      id: "pod-janitor-clusterrolebinding",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "ClusterRoleBinding",
        metadata: {
          name: podJanitor.resourceName,
          labels: RESOURCE_LABELS,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "ClusterRole",
          name: podJanitor.resourceName,
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: podJanitor.resourceName,
            namespace: NAMESPACE,
          },
        ],
      },
    },
    {
      id: "pod-janitor-cronjob",
      manifest: {
        apiVersion: "batch/v1",
        kind: "CronJob",
        metadata: {
          name: podJanitor.resourceName,
          namespace: NAMESPACE,
          labels: RESOURCE_LABELS,
        },
        spec: {
          schedule: "0 */6 * * *",
          concurrencyPolicy: "Forbid",
          successfulJobsHistoryLimit: 3,
          failedJobsHistoryLimit: 3,
          jobTemplate: {
            spec: {
              backoffLimit: 1,
              activeDeadlineSeconds: 300,
              template: {
                metadata: { labels: POD_LABELS },
                spec: {
                  serviceAccountName: podJanitor.resourceName,
                  restartPolicy: "Never",
                  securityContext: {
                    seccompProfile: { type: "RuntimeDefault" },
                  },
                  containers: [
                    {
                      name: "janitor",
                      image: JANITOR_IMAGE,
                      command: ["/bin/sh", "-c", JANITOR_SCRIPT],
                      env: [
                        { name: "HOME", value: "/tmp" },
                        { name: "MIN_AGE_SECONDS", value: DEFAULT_MIN_AGE_SECONDS },
                      ],
                      resources: {
                        requests: { cpu: "10m", memory: "128Mi" },
                        limits: { memory: "128Mi" },
                      },
                      securityContext: {
                        runAsNonRoot: true,
                        runAsUser: 1000,
                        readOnlyRootFilesystem: true,
                        allowPrivilegeEscalation: false,
                        capabilities: { drop: ["ALL"] },
                      },
                      volumeMounts: [{ name: "tmp", mountPath: "/tmp" }],
                    },
                  ],
                  volumes: [{ name: "tmp", emptyDir: {} }],
                },
              },
            },
          },
        },
      },
    },
  ])
}

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return synthNamespaceCronjob(NAMESPACE, NAMESPACE_LABELS, cronjobYaml)
}
