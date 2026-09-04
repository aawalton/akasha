import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { deploySourceSync } from "@akasha/workflow-language/source-sync"
import { workflow } from "@akasha/workflow-language/workflow"

export default workflow("git-transport", {
  kind: "foundation",
  dependsOn: ["ci-images", "preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "git-transport-apply-git-namespace",
      namespace: "git",
      files: "infra/git-transport/generated/namespace.generated.yaml",
      serverSide: true,
    }),
    {
      ...kubectlApply({
        name: "git-transport-apply-pv",
        namespace: "git",
        files: "infra/git-transport/generated/pv.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["git-transport-apply-git-namespace"],
    },
    {
      ...kubectlApply({
        name: "git-transport-apply-pvc",
        namespace: "git",
        files: "infra/git-transport/generated/pvc.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["git-transport-apply-pv"],
    },
    {
      ...kubectlApply({
        name: "git-transport-apply-deployment",
        namespace: "git",
        files: "infra/git-transport/generated/deployment.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["git-transport-apply-pvc"],
    },
    {
      ...kubectlApply({
        name: "git-transport-apply-service",
        namespace: "git",
        files: "infra/git-transport/generated/service.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["git-transport-apply-git-namespace"],
    },
    {
      ...deploySourceSync({
        name: "git-transport-source-sync",
        namespace: "git",
        deployment: "git-transport",
        sha: (ci) => ci.commitSha,
      }),
      dependsOn: ["git-transport-apply-deployment"],
    },
  ],
})
