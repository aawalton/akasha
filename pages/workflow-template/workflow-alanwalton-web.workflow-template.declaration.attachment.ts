import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets"
import { step } from "../../tools/lib/workflow-dsl/step"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash"
import { deploySourceSyncBuildAndRestart } from "../../tools/lib/workflow-dsl/templates/source-sync-build"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const alanwalton = workflow("alanwalton-web", {
  kind: "apps",
  dependsOn: ["preparation", "alanwalton"],
  when: { branch: "main", event: "push" },
  package: "@alanwalton/web",
  steps: [
    step({
      name: "alanwalton-web-apply-deployment",
      image: IMAGES.KUBECTL,
      environment: { HOME: "/tmp" },
      commands: (ci) => [
        "set -e",
        ...checksumHashCommands({
          variable: "S3_CREDS_HASH",
          read: "kubectl get secret alanwalton-s3-creds -n alanwalton -o jsonpath='{.data.access_key}{.data.secret_key}'",
          subject: "alanwalton-s3-creds",
        }),
        `sed "s|checksum/s3-creds:.*|checksum/s3-creds: \\"${"$"}{S3_CREDS_HASH}\\"|" ${ci.workspace}/alanwalton/web/deploy/k8s/generated/web-deployment.generated.yaml | kubectl apply --server-side --force-conflicts -n alanwalton -f -`,
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
    {
      ...deploySourceSyncBuildAndRestart({
        name: "alanwalton-web-source-sync-build-restart",
        namespace: "alanwalton",
        deployment: "web",
        sha: (ci) => ci.commitSha,
        buildPackagePath: "alanwalton/web",
        buildEnv: [{ name: "NEXT_PUBLIC_SUPABASE_COOKIE_DOMAIN", value: ".alanwalton.com" }],
      }),
      dependsOn: ["alanwalton-web-apply-deployment"],
    },
    step({
      name: "alanwalton-web-publish-live-version",
      image: IMAGES.CI,
      when: [{ status: "success", branch: "main", event: "push" }],
      dependsOn: ["alanwalton-web-source-sync-build-restart"],
      environment: {
        HOME: "/tmp",
        SUPABASE_URL: "https://supabase.alanwalton.com",
        SUPABASE_SERVICE_ROLE_KEY: secret(SECRETS.ALANWALTON_SERVICE_ROLE_KEY),
      },
      commands: (ci) => [
        "set -e",
        `cd ${ci.workspace}`,
        `bun ${ci.workspace}/infra/scripts/src/set-app-live-version.ts --app alanwalton-web --version "${ci.commitSha}"`,
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})

export const workflows = [alanwalton]
