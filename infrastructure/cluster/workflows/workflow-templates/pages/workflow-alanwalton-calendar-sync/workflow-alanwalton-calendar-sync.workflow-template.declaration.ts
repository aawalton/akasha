import { buildkitBuild } from "@akasha/workflow-language/buildkit"
import { IMAGES, REGISTRY } from "@akasha/workflow-language/images"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

export default workflow("alanwalton-calendar-sync", {
  kind: "apps",
  package: "@akasha/calendar-sync",
  dependsOn: ["preparation", "alanwalton"],
  when: { branch: "main", event: "push" },
  steps: [
    {
      ...buildkitBuild({
        name: "alanwalton-calendar-sync-build",
        context: ".",
        dockerfile: "akasha/calendar-sync",
        tag: (ci) => `${REGISTRY}/alanwalton/alanwalton-calendar-sync:${ci.inputsHash}`,
        cacheTag: `${REGISTRY}/alanwalton/alanwalton-calendar-sync:buildcache`,
        image: IMAGES.CI,
        cache: false,
        preCommands: (ci) => [
          `bun ${ci.workspace}/infrastructure/dockerfiles/dockerfile-writing/dockerfile-writing.module.code.ts --service alanwalton-calendar-sync`,
        ],
      }),
      skipIfTagExists: (ci) => `${REGISTRY}/alanwalton/alanwalton-calendar-sync:${ci.inputsHash}`,
      when: [{ status: "success", branch: "main", event: "push" }],
    },
    step({
      name: "alanwalton-calendar-sync-deploy-cronjob",
      image: IMAGES.KUBECTL,
      dependsOn: ["alanwalton-calendar-sync-build"],
      when: [{ status: "success", branch: "main", event: "push" }],
      environment: { HOME: "/tmp" },
      commands: (ci) => [
        "set -e",
        `sed "s|MUST_BE_SET_BY_DEPLOY_SCRIPT|${REGISTRY}/alanwalton/alanwalton-calendar-sync:${ci.inputsHash}|g" calendar-sync/generated/cronjob.generated.yaml | kubectl apply --server-side --force-conflicts -n alanwalton -f -`,
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})
