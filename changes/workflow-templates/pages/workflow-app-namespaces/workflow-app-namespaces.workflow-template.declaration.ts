import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { manifestPath } from "@akasha/workflow-language/manifest-path"
import { workflow } from "@akasha/workflow-language/workflow"

const APP_NAMESPACES_SYNTH =
  "infrastructure/cluster-manifests/app-namespaces-synth/app-namespaces-synth.module.code.ts"

export default workflow("app-namespaces", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "app-namespaces-apply",
      namespace: "app-namespaces",
      files: manifestPath(APP_NAMESPACES_SYNTH, "namespaces"),
      serverSide: true,
    }),
  ],
})
