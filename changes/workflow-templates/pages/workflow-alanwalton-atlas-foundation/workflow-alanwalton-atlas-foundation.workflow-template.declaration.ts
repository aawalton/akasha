import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { workflow } from "@akasha/workflow-language/workflow"

export const workflows = [
  workflow("alanwalton-atlas-foundation", {
    kind: "foundation",
    dependsOn: ["preparation", "alanwalton"],
    when: { branch: "main", event: "push" },
    steps: [
      kubectlApply({
        name: "alanwalton-atlas-foundation-apply-service",
        namespace: "alanwalton",
        files: "alan/atlas-web/generated/atlas-service.generated.yaml",
        serverSide: true,
      }),
    ],
  }),
]
