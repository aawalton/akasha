import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

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
        rbacFile: "tools/lib/rbac/pod-janitor.ts",
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
