import { synthMulti } from "akasha/infrastructure/cluster/k8s-type/modules/cdk8s-synth/cdk8s-synth.module.code.ts"
import { kubernetesLabels } from "akasha/infrastructure/cluster/k8s-type/modules/labels/labels.module.code.ts"
import { mintedSecretJsonpath } from "akasha/infrastructure/cluster/k8s-type/modules/secret-checksum/secret-checksum.module.code.ts"

const ROLLER_IMAGE = "registry.registry.svc.cluster.local:5000/cluster/ci:latest"
const SCHEDULE = "*/15 * * * *"
const MANAGED_BY = "deploy-script"
const API_SERVER_NODES = "192.168.68.0/24"
const API_SERVER_SERVICE = "10.96.0.0/12"

export interface CertificateRolled {
  readonly namespace: string
  readonly kind: "Deployment" | "StatefulSet" | "DaemonSet"
  readonly name: string
  readonly secret: string
  readonly keys: readonly string[]
  readonly annotation: string
}

const ROLLING_SCRIPT = `set -eu

data="$(kubectl get secret "\${SECRET}" -n "\${NAMESPACE}" -o "jsonpath=\${JSONPATH}")"
if [ -z "\${data}" ]; then
  echo "[certificate-rolling] secret \${SECRET} read empty, so nothing is rolled"
  exit 1
fi
want="$(printf '%s' "\${data}" | md5sum | cut -d' ' -f1)"
have="$(kubectl get "\${WORKLOAD}" -n "\${NAMESPACE}" -o json | jq -r --arg a "\${ANNOTATION}" '.spec.template.metadata.annotations[$a] // ""')"

if [ "\${want}" = "\${have}" ]; then
  echo "[certificate-rolling] \${WORKLOAD} already serves what \${SECRET} holds"
  exit 0
fi

echo "[certificate-rolling] \${SECRET} is \${want} and \${WORKLOAD} was started on \${have:-nothing}, so it rolls"
patch="$(jq -cn --arg a "\${ANNOTATION}" --arg v "\${want}" '{spec:{template:{metadata:{annotations:{($a):$v}}}}}')"
kubectl patch "\${WORKLOAD}" -n "\${NAMESPACE}" --type merge -p "\${patch}"
`

export function certificateRollingYaml(rolled: CertificateRolled): string {
  const name = `${rolled.name}-certificate-rolling`
  const labels = kubernetesLabels({ name, partOf: rolled.name, managedBy: MANAGED_BY })
  const podLabels = { "app.kubernetes.io/name": name }
  return synthMulti(rolled.namespace, [
    {
      id: "certificate-rolling-sa",
      manifest: {
        apiVersion: "v1",
        kind: "ServiceAccount",
        metadata: { name, namespace: rolled.namespace, labels },
      },
    },
    {
      id: "certificate-rolling-role",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "Role",
        metadata: { name, namespace: rolled.namespace, labels },
        rules: [
          {
            apiGroups: [""],
            resources: ["secrets"],
            resourceNames: [rolled.secret],
            verbs: ["get"],
          },
          {
            apiGroups: ["apps"],
            resources: [`${rolled.kind.toLowerCase()}s`],
            resourceNames: [rolled.name],
            verbs: ["get", "patch"],
          },
        ],
      },
    },
    {
      id: "certificate-rolling-rolebinding",
      manifest: {
        apiVersion: "rbac.authorization.k8s.io/v1",
        kind: "RoleBinding",
        metadata: { name, namespace: rolled.namespace, labels },
        roleRef: { apiGroup: "rbac.authorization.k8s.io", kind: "Role", name },
        subjects: [{ kind: "ServiceAccount", name, namespace: rolled.namespace }],
      },
    },
    {
      id: "certificate-rolling-api-egress",
      manifest: {
        apiVersion: "networking.k8s.io/v1",
        kind: "NetworkPolicy",
        metadata: { name, namespace: rolled.namespace, labels },
        spec: {
          podSelector: { matchLabels: podLabels },
          policyTypes: ["Egress"],
          egress: [
            {
              to: [{ ipBlock: { cidr: API_SERVER_NODES } }],
              ports: [{ protocol: "TCP", port: 6443 }],
            },
            {
              to: [{ ipBlock: { cidr: API_SERVER_SERVICE } }],
              ports: [{ protocol: "TCP", port: 443 }],
            },
          ],
        },
      },
    },
    {
      id: "certificate-rolling-cronjob",
      manifest: {
        apiVersion: "batch/v1",
        kind: "CronJob",
        metadata: { name, namespace: rolled.namespace, labels },
        spec: {
          schedule: SCHEDULE,
          concurrencyPolicy: "Forbid",
          successfulJobsHistoryLimit: 1,
          failedJobsHistoryLimit: 3,
          jobTemplate: {
            spec: {
              backoffLimit: 1,
              activeDeadlineSeconds: 120,
              template: {
                metadata: { labels: podLabels },
                spec: {
                  serviceAccountName: name,
                  restartPolicy: "Never",
                  securityContext: { seccompProfile: { type: "RuntimeDefault" } },
                  containers: [
                    {
                      name: "rolling",
                      image: ROLLER_IMAGE,
                      command: ["/bin/sh", "-c", ROLLING_SCRIPT],
                      env: [
                        { name: "HOME", value: "/tmp" },
                        { name: "NAMESPACE", value: rolled.namespace },
                        { name: "SECRET", value: rolled.secret },
                        { name: "JSONPATH", value: mintedSecretJsonpath(rolled.keys) },
                        { name: "WORKLOAD", value: `${rolled.kind.toLowerCase()}/${rolled.name}` },
                        { name: "ANNOTATION", value: rolled.annotation },
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
