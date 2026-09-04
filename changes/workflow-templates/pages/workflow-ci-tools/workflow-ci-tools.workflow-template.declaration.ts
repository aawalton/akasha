import { IMAGES } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

export default workflow("ci-tools", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "ci-tools-apply-ci-namespace",
      namespace: "ci",
      files:
        "akasha/infrastructure/cluster-manifests/ci-namespace-synth/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...kubectlApply({
        name: "ci-tools-apply-ci-storage-scripts-configmap",
        namespace: "ci",
        files:
          "infra/k8s/src/ci-tools/ci-storage-admin/generated/ci-storage-scripts-configmap.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["ci-tools-apply-ci-namespace"],
    },

    {
      ...kubectlApply({
        name: "ci-tools-apply-ci-storage-admin-deployment",
        namespace: "ci",
        files:
          "infra/k8s/src/ci-tools/ci-storage-admin/generated/ci-storage-admin-deployment.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["ci-tools-apply-ci-storage-scripts-configmap"],
    },

    {
      ...kubectlApply({
        name: "ci-tools-apply-ci-storage-maintain-daemonset",
        namespace: "ci",
        files:
          "infra/k8s/src/ci-tools/ci-storage-maintain/generated/ci-storage-maintain-daemonset.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["ci-tools-apply-ci-storage-scripts-configmap"],
    },

    {
      ...step({
        name: "ci-tools-delete-legacy-maintain-cronjob",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: () => [
          "set -e",
          "kubectl delete cronjob ci-storage-maintain -n ci --ignore-not-found",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["ci-tools-apply-ci-storage-maintain-daemonset"],
    },

    {
      ...step({
        name: "ci-tools-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap ci-storage-state -n ci --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap ci-storage-state -n ci pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "ci-tools-apply-ci-storage-admin-deployment",
        "ci-tools-apply-ci-storage-maintain-daemonset",
        "ci-tools-delete-legacy-maintain-cronjob",
      ],
    },
  ],
})
