import { buildkitBuild } from "@akasha/workflow-language/buildkit"
import { deploySetImage } from "@akasha/workflow-language/deploy"
import { IMAGES, REGISTRY } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

export default workflow("auth-proxy", {
  kind: "foundation",
  dependsOn: ["ci-images", "preparation", "gotrue"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "auth-proxy-apply-namespace",
      namespace: "auth-proxy",
      files: "infra/auth-proxy/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "auth-proxy-apply-rbac",
        rbacFile:
          "akasha/infrastructure/cluster-manifests/auth-proxy-rbac/auth-proxy-rbac.module.code.ts",
      }),
      dependsOn: ["auth-proxy-apply-namespace"],
    },

    {
      ...step({
        name: "auth-proxy-generate-dockerfile",
        image: IMAGES.BUN_GIT,
        skipIfTagExists: (ci) => `${REGISTRY}/infra/auth-proxy:${ci.inputsHash}`,
        commands: (ci) => [
          "set -e",

          `bun ${ci.workspace}/infra/scripts/src/generate-dockerfiles.ts --app auth-proxy`,
        ],
        environment: { HUSKY: "0" },
        backendOptions: {
          kubernetes: { resources: { limits: { memory: "4Gi" } } },
        },
      }),
      dependsOn: ["auth-proxy-apply-namespace"],
    },

    {
      ...buildkitBuild({
        name: "auth-proxy-build",
        context: "",
        dockerfile: "infra/auth-proxy",
        tag: (ci) => `${REGISTRY}/infra/auth-proxy:${ci.inputsHash}`,
        cache: false,
      }),
      skipIfTagExists: (ci) => `${REGISTRY}/infra/auth-proxy:${ci.inputsHash}`,
      dependsOn: ["auth-proxy-generate-dockerfile"],
    },

    {
      ...kubectlApply({
        name: "auth-proxy-apply-deployment",
        namespace: "auth-proxy",
        files: "infra/auth-proxy/generated/deployment.generated.yaml",
        serverSide: true,
        imageSubstitution: {
          placeholder: "MUST_BE_SET_BY_DEPLOY",
          tag: (ci) => `${REGISTRY}/infra/auth-proxy:${ci.inputsHash}`,
        },
      }),
      dependsOn: ["auth-proxy-build"],
    },

    {
      ...kubectlApply({
        name: "auth-proxy-apply-service",
        namespace: "auth-proxy",
        files: "infra/auth-proxy/generated/service.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["auth-proxy-apply-namespace"],
    },

    {
      ...deploySetImage({
        name: "auth-proxy-deploy",
        namespace: "auth-proxy",
        deployment: "auth-proxy",
        container: "auth-proxy",
        tag: (ci) => `${REGISTRY}/infra/auth-proxy:${ci.inputsHash}`,
      }),
      dependsOn: ["auth-proxy-apply-deployment"],
    },

    {
      ...step({
        name: "auth-proxy-stamp-content-hash",
        image: IMAGES.KUBECTL,

        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap auth-proxy-pipeline-state -n auth-proxy --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap auth-proxy-pipeline-state -n auth-proxy pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["auth-proxy-apply-deployment", "auth-proxy-apply-service", "auth-proxy-deploy"],
    },
  ],
})
