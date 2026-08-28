import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { deploySourceSyncBuildAndRestart } from "../../tools/lib/workflow-dsl/templates/source-sync-build"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const smilingjenny = workflow("smilingjenny-web", {
  kind: "apps",
  dependsOn: ["preparation", "smilingjenny"],
  when: { branch: "main", event: "push" },
  package: "@smilingjenny/web",
  steps: [
    kubectlApply({
      name: "smilingjenny-web-apply-deployment",
      namespace: "smilingjenny",
      files: "smilingjenny/web/deploy/k8s/generated/web-deployment.generated.yaml",
      serverSide: true,
    }),
    {
      ...deploySourceSyncBuildAndRestart({
        name: "smilingjenny-web-source-sync-build-restart",
        namespace: "smilingjenny",
        deployment: "web",
        sha: (ci) => ci.commitSha,
        buildPackagePath: "smilingjenny/web",
      }),
      dependsOn: ["smilingjenny-web-apply-deployment"],
    },
  ],
})

export const workflows = [smilingjenny]
