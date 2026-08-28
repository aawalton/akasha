import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets"
import { step } from "../../tools/lib/workflow-dsl/step"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash"
import { deploySourceSyncBuildAndRestart } from "../../tools/lib/workflow-dsl/templates/source-sync-build"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export const workflows = [
  workflow("alanwalton-atlas", {
    kind: "apps",
    dependsOn: ["preparation", "alanwalton-atlas-foundation"],
    when: { branch: "main", event: "push" },
    package: "@alanwalton/atlas-web",
    steps: [
      step({
        name: "alanwalton-atlas-apply-deployment",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          ...checksumHashCommands({
            variable: "S3_CREDS_HASH",
            read: "kubectl get secret alanwalton-s3-creds -n alanwalton -o jsonpath='{.data.access_key}{.data.secret_key}'",
            subject: "alanwalton-s3-creds",
          }),
          `sed "s|checksum/s3-creds:.*|checksum/s3-creds: \\"${"$"}{S3_CREDS_HASH}\\"|" ${ci.workspace}/alanwalton/atlas-web/deploy/k8s/generated/atlas-deployment.generated.yaml | kubectl apply --server-side --force-conflicts -n alanwalton -f -`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      {
        ...deploySourceSyncBuildAndRestart({
          name: "alanwalton-atlas-source-sync-build-restart",
          namespace: "alanwalton",
          deployment: "atlas",
          sha: (ci) => ci.commitSha,
          buildPackagePath: "alanwalton/atlas-web",
          buildEnv: [{ name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".alanwalton.com" }],
        }),
        dependsOn: ["alanwalton-atlas-apply-deployment"],
      },
      step({
        name: "alanwalton-atlas-publish-live-version",
        image: IMAGES.CI,
        when: [{ status: "success", branch: "main", event: "push" }],
        dependsOn: ["alanwalton-atlas-source-sync-build-restart"],
        environment: {
          HOME: "/tmp",
          SUPABASE_URL: "https://supabase.alanwalton.com",
          SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.ALANWALTON_SERVICE_ROLE_KEY),
        },
        commands: (ci) => [
          "set -e",
          `cd ${ci.workspace}`,
          `bun ${ci.workspace}/infra/scripts/src/set-app-live-version.ts --app alanwalton-atlas-web --version "${ci.commitSha}"`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
    ],
  }),
]
