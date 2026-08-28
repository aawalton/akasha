import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export const workflows = [
  workflow("alanwalton-atlas-foundation", {
    kind: "foundation",
    dependsOn: ["preparation", "alanwalton"],
    when: { branch: "main", event: "push" },
    steps: [
      kubectlApply({
        name: "alanwalton-atlas-foundation-apply-service",
        namespace: "alanwalton",
        files: "alanwalton/atlas-web/deploy/k8s/generated/atlas-service.generated.yaml",
        serverSide: true,
      }),
    ],
  }),
]
