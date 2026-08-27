import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets"
import { step } from "../../tools/lib/workflow-dsl/step"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { deploySourceSyncBuildAndRestart } from "../../tools/lib/workflow-dsl/templates/source-sync-build"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const temperWeb = workflow("temper-web", {
  kind: "apps",
  dependsOn: ["preparation", "temper", "temper-watcher"],
  when: { branch: "main", event: "push" },
  package: "@temper/web",
  dispatchNodes: [
    "package:code:@temper/web",
    "workflow:instructions:temper-watcher",
    "package:code:@temper/scripts",
    "dockerfile-file:code:packages/infra/k8s/src/temper-watcher/build/Dockerfile",
    "toml-file:code:packages/temper/watcher-tray/Cargo.toml",
    "rust-file:code:packages/temper/watcher-tray/build.rs",
    "rust-file:code:packages/temper/watcher-tray/src/main.rs",
    "rust-file:code:packages/temper/watcher-tray/src/installer.rs",
    "rust-file:code:packages/temper/watcher-tray/src/logger.rs",
    "rust-file:code:packages/temper/watcher-tray/src/supervisor.rs",
    "rust-file:code:packages/temper/watcher-tray/src/tray.rs",
    "rust-file:code:packages/temper/watcher-tray/src/updater.rs",
  ],
  dispatchNodeTypes: [
    { kind: "ts-file", under: "temper" },
    { kind: "json-file", under: "temper" },
  ],
  steps: [
    kubectlApply({
      name: "temper-web-apply-deployment",
      namespace: "temper",
      files: "temper/web/deploy/k8s/generated/web-deployment.generated.yaml",
      serverSide: true,
    }),
    {
      ...deploySourceSyncBuildAndRestart({
        name: "temper-web-source-sync-build-restart",
        namespace: "temper",
        deployment: "web",
        sha: (ci) => ci.commitSha,
        buildPackagePath: "temper/web",
        buildEnv: [
          { name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".tempereso.com" },
          { name: "SUPABASE_URL", value: "https://supabase.alanwalton.com" },
          {
            name: "SUPABASE_SERVICE_ROLE_KEY",
            fromSecret: { name: "temper-secrets", key: "SUPABASE_SERVICE_ROLE_KEY" },
          },
        ],
      }),
      dependsOn: ["temper-web-apply-deployment"],
    },
    step({
      name: "temper-web-publish-live-version",
      image: IMAGES.CI,
      when: [{ status: "success", branch: "main", event: "push" }],
      dependsOn: ["temper-web-source-sync-build-restart"],
      environment: {
        HOME: "/tmp",
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.ALANWALTON_SERVICE_ROLE_KEY),
      },
      commands: (ci) => [
        "set -e",
        `cd ${ci.workspace}`,
        `bun ${ci.workspace}/infra/scripts/src/set-app-live-version.ts --app temper-web --version "${ci.commitSha}"`,
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})

export const workflows = [temperWeb]
