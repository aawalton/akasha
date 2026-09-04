import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
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
        "infrastructure/cluster-manifests/ci-namespace-synth/generated/namespace.generated.yaml",
      serverSide: true,
    }),
  ],
})
