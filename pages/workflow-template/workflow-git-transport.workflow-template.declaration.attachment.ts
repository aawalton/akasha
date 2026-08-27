import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { deploySourceSync } from "../../tools/lib/workflow-dsl/templates/source-sync"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export default workflow("git-transport", {
  kind: "foundation",
  dependsOn: ["ci-images", "preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodes: ["package:code:@infra/git-transport"],
  steps: [
    kubectlApply({
      name: "git-transport-apply-git-namespace",
      namespace: "git",
      files: "infra/git-transport/k8s/generated/namespace.generated.yaml",
      serverSide: true,
    }),
    {
      ...sopsDecryptApply({
        name: "git-transport-apply-secrets",
        namespace: "git",
        secretFile: "infra/git-transport/k8s/secrets.sops.yaml",
      }),
      dependsOn: ["git-transport-apply-git-namespace"],
    },
    {
      ...kubectlApply({
        name: "git-transport-apply-pv",
        namespace: "git",
        files: "infra/git-transport/k8s/generated/pv.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["git-transport-apply-git-namespace"],
    },
    {
      ...kubectlApply({
        name: "git-transport-apply-pvc",
        namespace: "git",
        files: "infra/git-transport/k8s/generated/pvc.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["git-transport-apply-pv"],
    },
    {
      ...kubectlApply({
        name: "git-transport-apply-deployment",
        namespace: "git",
        files: "infra/git-transport/k8s/generated/deployment.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["git-transport-apply-secrets", "git-transport-apply-pvc"],
    },
    {
      ...kubectlApply({
        name: "git-transport-apply-service",
        namespace: "git",
        files: "infra/git-transport/k8s/generated/service.generated.yaml",
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
