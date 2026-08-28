import { IMAGES } from "../../tools/lib/workflow-dsl/images.ts"
import { step } from "../../tools/lib/workflow-dsl/step.ts"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash.ts"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply.ts"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply.ts"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt.ts"
import { workflow } from "../../tools/lib/workflow-dsl/workflow.ts"

const MIRROR_S3_CREDS_CMD =
  "kubectl get secret seaweedfs-creds -n seaweedfs -o json | " +
  'jq \'{apiVersion:"v1",kind:"Secret",type:"Opaque",' +
  'metadata:{name:"headscale-s3-creds",namespace:"headscale"},' +
  "data:{access_key:.data.access_key,secret_key:.data.secret_key}}' | " +
  "kubectl apply -f -"

export default workflow("headscale", {
  kind: "foundation",
  dependsOn: ["metallb", "cert-manager", "preparation", "seaweedfs"],
  when: { branch: "main", event: "push" },
  steps: [
    kubectlApply({
      name: "headscale-apply-namespace",
      namespace: "headscale",
      files: "infra/k8s/src/headscale/generated/namespace.generated.yaml",
      serverSide: true,
    }),
    applyRbac({
      name: "headscale-apply-rbac",
      rbacFile: "tools/lib/rbac/headscale.ts",
    }),
    sopsDecryptApply({
      name: "headscale-apply-secret",
      namespace: "headscale",
      secretFile: "infra/k8s/src/headscale/headscale.k8s-secret.sops.yaml",
    }),
    kubectlApply({
      name: "headscale-apply-configmap",
      namespace: "headscale",
      files: "infra/k8s/src/headscale/generated/configmap.generated.yaml",
      serverSide: true,
    }),
    kubectlApply({
      name: "headscale-apply-policy",
      namespace: "headscale",
      files: "infra/k8s/src/headscale/generated/policy-configmap.generated.yaml",
      serverSide: true,
    }),
    kubectlApply({
      name: "headscale-apply-litestream-configmap",
      namespace: "headscale",
      files: "infra/k8s/src/headscale/generated/litestream-configmap.generated.yaml",
      serverSide: true,
    }),
    {
      ...step({
        name: "headscale-mirror-s3-creds",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: ["set -e", MIRROR_S3_CREDS_CMD],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["headscale-apply-namespace"],
    },
    kubectlApply({
      name: "headscale-apply-certificate",
      namespace: "headscale",
      files: "infra/k8s/src/headscale/generated/certificate.generated.yaml",
      serverSide: true,
    }),
    {
      ...step({
        name: "headscale-wait-for-certificate",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          "kubectl wait --for=condition=Ready --timeout=180s -n headscale certificate/headscale-tls",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["headscale-apply-certificate"],
    },
    kubectlApply({
      name: "headscale-apply-service",
      namespace: "headscale",
      files: "infra/k8s/src/headscale/generated/service.generated.yaml",
      serverSide: true,
    }),
    kubectlApply({
      name: "headscale-apply-network-policy",
      namespace: "headscale",
      files: "infra/k8s/src/headscale/generated/network-policy.generated.yaml",
      serverSide: true,
    }),
    {
      ...step({
        name: "headscale-apply-statefulset",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          ...checksumHashCommands({
            variable: "S3_CREDS_HASH",
            read: "kubectl get secret headscale-s3-creds -n headscale -o jsonpath='{.data.access_key}{.data.secret_key}'",
            subject: "headscale-s3-creds",
          }),
          `sed "s|checksum/s3-creds:.*|checksum/s3-creds: \\"${"$"}{S3_CREDS_HASH}\\"|" ${ci.workspace}/infra/k8s/src/headscale/generated/statefulset.generated.yaml | kubectl apply --server-side --force-conflicts -n headscale -f -`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: [
        "headscale-apply-configmap",
        "headscale-apply-policy",
        "headscale-apply-litestream-configmap",
        "headscale-apply-secret",
        "headscale-mirror-s3-creds",
        "headscale-wait-for-certificate",
      ],
    },
    {
      ...step({
        name: "headscale-wait-for-rollout",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          "kubectl rollout status statefulset/headscale -n headscale --timeout=180s",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["headscale-apply-statefulset"],
    },
    {
      ...kubectlApply({
        name: "headscale-apply-subnet-router",
        namespace: "headscale",
        files:
          "infra/k8s/src/headscale/talos-subnet-router/generated/subnet-router-deployment.generated.yaml",
        serverSide: true,
      }),
      dependsOn: ["headscale-wait-for-rollout"],
    },
  ],
})
