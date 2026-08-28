import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets"
import { step } from "../../tools/lib/workflow-dsl/step"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { deploySourceSyncBuildAndRestart } from "../../tools/lib/workflow-dsl/templates/source-sync-build"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const audhdalan = workflow("audhdalan-web", {
  kind: "apps",
  dependsOn: ["preparation", "audhdalan"],
  when: { branch: "main", event: "push" },
  package: "@audhdalan/web",
  steps: [
    kubectlApply({
      name: "audhdalan-web-apply-deployment",
      namespace: "audhdalan",
      files: "audhdalan/web/generated/web-deployment.generated.yaml",
      serverSide: true,
    }),
    {
      ...deploySourceSyncBuildAndRestart({
        name: "audhdalan-web-source-sync-build-restart",
        namespace: "audhdalan",
        deployment: "web",
        sha: (ci) => ci.commitSha,
        buildPackagePath: "audhdalan/web",
        noDefaultSupabaseEnv: true,
      }),
      dependsOn: ["audhdalan-web-apply-deployment"],
    },
    step({
      name: "audhdalan-web-publish-live-version",
      image: IMAGES.CI,
      when: [{ status: "success", branch: "main", event: "push" }],
      dependsOn: ["audhdalan-web-source-sync-build-restart"],
      environment: {
        HOME: "/tmp",
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.ALANWALTON_SERVICE_ROLE_KEY),
      },
      commands: (ci) => [
        "set -e",
        `cd ${ci.workspace}`,
        `bun ${ci.workspace}/infra/scripts/src/set-app-live-version.ts --app audhdalan-web --version "${ci.commitSha}"`,
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})

export const workflows = [audhdalan]
