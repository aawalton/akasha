import { synthMulti, synthOne } from "@infra/k8s-types/cdk8s-synth"

const NAMESPACE = "pod-janitor"
const APP_NAME = "pod-janitor"
const INSTANCE_NAME = "infra"
const COMPONENT = "gc"
const PART_OF = "infra"
const MANAGED_BY = "deploy-script"

const JANITOR_IMAGE = "registry.registry.svc.cluster.local:5000/cluster/ci:latest"

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
  | select((.metadata.labels["app.kubernetes.io/name"] // "") != "ci-storage-maintain")
  | select(($now - (.metadata.creationTimestamp | fromdateiso8601)) >= $minAge)
  | "\\(.metadata.namespace) \\(.metadata.name)"
' /tmp/failed-pods.json | while read -r ns name; do
  [ -n "\${ns:-}" ] || continue
  echo "[pod-janitor] deleting \${ns}/\${name}"
  kubectl delete pod -n "\${ns}" "\${name}" --ignore-not-found
done

echo "[pod-janitor] sweep complete"
`

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

function cronjobYaml(): string {
  return synthMulti(NAMESPACE, [
    {
      id: "pod-janitor-sa",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: {
          name: "pod-janitor",
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
          name: "pod-janitor",
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
          name: "pod-janitor",
          labels: RESOURCE_LABELS,
        },
        roleRef: {
          apiGroup: "rbac.authorization.k8s.io",
          kind: "ClusterRole",
          name: "pod-janitor",
        },
        subjects: [
          {
            kind: "ServiceAccount",
            name: "pod-janitor",
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
          name: "pod-janitor",
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
                  serviceAccountName: "pod-janitor",
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
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "cronjob", yaml: cronjobYaml() },
  ]
}
