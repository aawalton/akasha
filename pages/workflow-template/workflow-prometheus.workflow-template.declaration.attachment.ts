import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets"
import { step } from "../../tools/lib/workflow-dsl/step"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap prometheus-pipeline-state -n prometheus -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("prometheus", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "prometheus-apply-namespace",
      namespace: "prometheus",
      files: "infra/k8s/src/prometheus/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "prometheus-apply-rbac",
        rbacFile: "tools/lib/rbac/prometheus.ts",
      }),
      dependsOn: ["prometheus-apply-namespace"],
    },

    {
      ...step({
        name: "prometheus-apply-secrets",
        image: IMAGES.CI,
        environment: {
          HOME: "/tmp",
          SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
        },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `DECRYPTED=$(sops -d ${ci.workspace}/infra/k8s/src/prometheus/prometheus.k8s-secret.sops.yaml)`,
          `echo "$DECRYPTED" | kubectl apply --dry-run=client -n prometheus -f -`,
          `echo "$DECRYPTED" | kubectl apply -n prometheus -f -`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["prometheus-apply-namespace"],
    },

    {
      ...step({
        name: "prometheus-apply-alertmanager-config",
        image: IMAGES.CI,
        environment: {
          HOME: "/tmp",
          SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
        },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          `DECRYPTED=$(sops -d ${ci.workspace}/infra/k8s/src/prometheus/alertmanager-config.k8s-secret.sops.yaml)`,
          `echo "$DECRYPTED" | kubectl apply --dry-run=client -n prometheus -f -`,
          `echo "$DECRYPTED" | kubectl apply -n prometheus -f -`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["prometheus-apply-namespace"],
    },

    {
      ...step({
        name: "prometheus-apply-configmaps",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/generated/prometheus-configmap.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/postgres-exporter/generated/postgres-exporter-queries-configmap.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["prometheus-apply-namespace"],
    },

    {
      ...step({
        name: "prometheus-apply-app-rbac",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -f infra/k8s/src/prometheus/generated/prometheus-rbac.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["prometheus-apply-namespace"],
    },

    {
      ...step({
        name: "prometheus-apply-manifests",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl delete pods -n prometheus --field-selector status.phase=Succeeded --ignore-not-found",
          "kubectl delete pods -n prometheus --field-selector status.phase=Failed --ignore-not-found",
          "kubectl apply --server-side --force-conflicts -f infra/k8s/src/prometheus/generated/prometheus-pv.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/generated/prometheus-pvc.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/generated/prometheus-deployment.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/generated/prometheus-service.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/postgres-exporter/generated/postgres-exporter-deployment.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/postgres-exporter/generated/postgres-exporter-service.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/pgbouncer-exporter/generated/pgbouncer-exporter-deployment.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/pgbouncer-exporter/generated/pgbouncer-exporter-service.generated.yaml",
          "kubectl apply --server-side --force-conflicts -f infra/k8s/src/prometheus/kube-state-metrics/generated/kube-state-metrics-rbac.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/kube-state-metrics/generated/kube-state-metrics-deployment.generated.yaml",
          "kubectl apply --server-side --force-conflicts -n prometheus -f infra/k8s/src/prometheus/kube-state-metrics/generated/kube-state-metrics-service.generated.yaml",
          "kubectl apply --server-side --force-conflicts -f infra/k8s/src/prometheus/node-exporter-daemonset/generated/node-exporter-daemonset.generated.yaml",
          "kubectl apply --server-side --force-conflicts -f infra/k8s/src/prometheus/dcgm-exporter-daemonset/generated/dcgm-exporter-daemonset.generated.yaml",
          ...verifyRolloutCommands({
            namespace: "prometheus",
            deployment: "prometheus",
            timeout: "180s",
          }),
          ...verifyRolloutCommands({
            namespace: "prometheus",
            deployment: "postgres-exporter",
            timeout: "180s",
          }),
          ...verifyRolloutCommands({
            namespace: "prometheus",
            deployment: "pgbouncer-exporter",
            timeout: "180s",
          }),
          "kubectl rollout restart deployment/prometheus -n prometheus",
          "kubectl rollout restart deployment/postgres-exporter -n prometheus",
          "kubectl rollout restart deployment/pgbouncer-exporter -n prometheus",
          ...verifyRolloutCommands({
            namespace: "prometheus",
            deployment: "prometheus",
            timeout: "180s",
          }),
          ...verifyRolloutCommands({
            namespace: "prometheus",
            deployment: "postgres-exporter",
            timeout: "180s",
          }),
          ...verifyRolloutCommands({
            namespace: "prometheus",
            deployment: "pgbouncer-exporter",
            timeout: "180s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "prometheus-apply-secrets",
        "prometheus-apply-alertmanager-config",
        "prometheus-apply-configmaps",
        "prometheus-apply-rbac",
        "prometheus-apply-app-rbac",
      ],
    },

    {
      ...step({
        name: "prometheus-stamp-content-hash",
        image: IMAGES.KUBECTL,

        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap prometheus-pipeline-state -n prometheus --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap prometheus-pipeline-state -n prometheus pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "prometheus-apply-secrets",
        "prometheus-apply-alertmanager-config",
        "prometheus-apply-configmaps",
        "prometheus-apply-rbac",
        "prometheus-apply-app-rbac",
        "prometheus-apply-manifests",
      ],
    },
  ],
})
