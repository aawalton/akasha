import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets"
import { step } from "../../tools/lib/workflow-dsl/step"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { deploySourceSyncBuildAndRestart } from "../../tools/lib/workflow-dsl/templates/source-sync-build"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const archiveOfWorlds = workflow("archive-of-worlds-web", {
  kind: "apps",
  dependsOn: ["preparation", "archive-of-worlds"],
  when: { branch: "main", event: "push" },
  package: "@archive-of-worlds/web",
  steps: [
    kubectlApply({
      name: "archive-of-worlds-web-apply-deployment",
      namespace: "archive-of-worlds",
      files: "archive-of-worlds/web/generated/web-deployment.generated.yaml",
      serverSide: true,
    }),
    {
      ...deploySourceSyncBuildAndRestart({
        name: "archive-of-worlds-web-sync-build-restart",
        namespace: "archive-of-worlds",
        deployment: "web",
        sha: (ci) => ci.commitSha,
        buildPackagePath: "archive-of-worlds/web",
        buildEnv: [{ name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".archiveofworlds.app" }],
      }),
      dependsOn: ["archive-of-worlds-web-apply-deployment"],
    },
    step({
      name: "archive-of-worlds-web-publish-live-version",
      image: IMAGES.CI,
      when: [{ status: "success", branch: "main", event: "push" }],
      dependsOn: ["archive-of-worlds-web-sync-build-restart"],
      environment: {
        HOME: "/tmp",
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.ALANWALTON_SERVICE_ROLE_KEY),
      },
      commands: (ci) => [
        "set -e",
        `cd ${ci.workspace}`,
        `bun ${ci.workspace}/infra/scripts/src/set-app-live-version.ts --app archive-of-worlds-web --version "${ci.commitSha}"`,
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})

export const workflows = [archiveOfWorlds]
