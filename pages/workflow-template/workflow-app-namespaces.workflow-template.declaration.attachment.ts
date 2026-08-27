import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export default workflow("app-namespaces", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodes: [
    "workflow:instructions:app-namespaces",
    "ts-file:code:packages/infra/k8s/src/app-namespaces/synth.ts",
  ],
  steps: [
    kubectlApply({
      name: "app-namespaces-apply",
      namespace: "app-namespaces",
      files: "infra/k8s/src/app-namespaces/generated/namespaces.generated.yaml",
      serverSide: true,
    }),
  ],
})
