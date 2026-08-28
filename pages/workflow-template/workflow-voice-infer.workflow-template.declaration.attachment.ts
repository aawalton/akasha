import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { verifyRolloutCommands } from "../../tools/lib/workflow-dsl/templates/verify-rollout"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const MIRROR_S3_CREDS_CMD =
  "kubectl get secret seaweedfs-creds -n seaweedfs -o json | " +
  'jq \'{apiVersion:"v1",kind:"Secret",type:"Opaque",' +
  'metadata:{name:"voice-infer-s3-creds",namespace:"voice"},' +
  "data:{access_key:.data.access_key,secret_key:.data.secret_key}}' | " +
  "kubectl apply -f -"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap voice-infer-pipeline-state -n voice -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("voice-infer", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "voice-infer-apply-namespace",
      namespace: "voice",
      files: "infra/voice-infer/generated/namespace.generated.yaml",
      serverSide: true,
    }),

    {
      ...applyRbac({
        name: "voice-infer-apply-rbac",
        rbacFile: "tools/lib/rbac/voice-infer.ts",
      }),
      dependsOn: ["voice-infer-apply-namespace"],
    },

    {
      ...step({
        name: "voice-infer-mirror-s3-creds",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: ["set -e", MIRROR_S3_CREDS_CMD],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["voice-infer-apply-namespace"],
    },

    {
      ...step({
        name: "voice-infer-apply-service",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          `CONTENT_HASH="${ci.inputsHash}"`,
          ...SKIP_CHECK,
          "kubectl apply --server-side --force-conflicts -n voice -f infra/voice-infer/generated/service.generated.yaml",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["voice-infer-apply-rbac"],
    },

    {
      ...step({
        name: "voice-infer-apply-deployment",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: () => [
          "set -e",
          ...checksumHashCommands({
            variable: "S3_CREDS_HASH",
            read: "kubectl get secret voice-infer-s3-creds -n voice -o jsonpath='{.data.access_key}{.data.secret_key}'",
            subject: "voice-infer-s3-creds",
          }),
          'sed "s|checksum/s3-creds:.*|checksum/s3-creds: \\"${S3_CREDS_HASH}\\"|" infra/voice-infer/generated/deployment.generated.yaml | kubectl apply --server-side --force-conflicts -n voice -f -',
          ...verifyRolloutCommands({
            namespace: "voice",
            deployment: "voice-infer",
            timeout: "300s",
          }),
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["voice-infer-apply-service", "voice-infer-mirror-s3-creds"],
    },

    {
      ...step({
        name: "voice-infer-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap voice-infer-pipeline-state -n voice --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap voice-infer-pipeline-state -n voice pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["voice-infer-apply-deployment"],
    },
  ],
})
