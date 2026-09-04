import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { workflow } from "@akasha/workflow-language/workflow"

export default workflow("app-namespaces", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "app-namespaces-apply",
      namespace: "app-namespaces",
      files: "infra/k8s/src/app-namespaces/generated/namespaces.generated.yaml",
      serverSide: true,
    }),
  ],
})
