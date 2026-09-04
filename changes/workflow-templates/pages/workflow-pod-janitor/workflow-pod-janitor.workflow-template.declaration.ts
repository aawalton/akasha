import { IMAGES } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

export default workflow("pod-janitor", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "pod-janitor-apply-namespace",
      namespace: "pod-janitor",
      files: "infra/k8s/src/pod-janitor/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "pod-janitor-apply-rbac",
        rbacFile:
          "infrastructure/cluster-manifests/pod-janitor-rbac/pod-janitor-rbac.module.code.ts",
      }),
      dependsOn: ["pod-janitor-apply-namespace"],
    },

    {
      ...step({
        name: "pod-janitor-apply",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          "kubectl apply --server-side --force-conflicts -f infra/k8s/src/pod-janitor/generated/cronjob.generated.yaml",
          "kubectl get cronjob pod-janitor -n pod-janitor",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["pod-janitor-apply-rbac"],
    },
  ],
})
