import { IMAGES } from "../../tools/lib/workflow-dsl/images.ts"
import { SECRETS, secret } from "../../tools/lib/workflow-dsl/secrets.ts"
import { step } from "../../tools/lib/workflow-dsl/step.ts"
import { checksumHashCommands } from "../../tools/lib/workflow-dsl/templates/checksum-hash.ts"
import { kubectlApplyClusterScoped } from "../../tools/lib/workflow-dsl/templates/kubectl-apply.ts"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply.ts"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt.ts"
import { workflow } from "../../tools/lib/workflow-dsl/workflow.ts"

export default workflow("cloudflared", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  dispatchNodeTypes: ["tunnel-route"],
  steps: [
    kubectlApplyClusterScoped({
      name: "cloudflared-apply-namespace",
      files: "infra/k8s/src/cloudflared/generated/namespace.generated.yaml",
      serverSide: true,
    }),
    applyRbac({
      name: "cloudflared-apply-rbac",
      rbacFile: "tools/lib/rbac/cloudflared.ts",
    }),
    sopsDecryptApply({
      name: "cloudflared-apply-secret",
      namespace: "cloudflared",
      secretFile: "infra/k8s/src/cloudflared/cloudflared.k8s-secret.sops.yaml",
    }),
    step({
      name: "cloudflared-generate-and-apply-config",
      image: IMAGES.CI,
      environment: { HOME: "/tmp", HUSKY: "0" },
      commands: (ci) => [
        "set -e",
        `LIVE_HASH=$(kubectl get configmap cloudflared-config -n cloudflared -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || true)`,
        `if [ "$LIVE_HASH" = "${ci.inputsHash}" ]; then echo "[skip] Content hash ${ci.inputsHash} matches live configmap — skipping"; exit 0; fi`,
        `bun ${ci.workspace}/infra/scripts/src/generate-tunnel-config.ts > /tmp/cloudflared-configmap.yaml`,
        "kubectl apply -f /tmp/cloudflared-configmap.yaml",
      ],
      dependsOn: [
        "cloudflared-apply-namespace",
        "cloudflared-apply-rbac",
        "cloudflared-apply-secret",
      ],
      backendOptions: {
        kubernetes: {
          serviceAccountName: "pipeline-engine",
          resources: { limits: { memory: "4Gi" } },
        },
      },
    }),
    step({
      name: "cloudflared-apply-deployment",
      image: IMAGES.CI,
      environment: {
        HOME: "/tmp",
        HUSKY: "0",
        SOPS_AGE_KEY: secret(SECRETS.AGE_SECRET_KEY),
      },
      commands: (ci) => [
        "set -e",
        ...checksumHashCommands({
          variable: "CONFIG_HASH",
          read: "kubectl get configmap cloudflared-config -n cloudflared -o jsonpath='{.data.config\\.yaml}'",
          subject: "cloudflared-config",
        }),
        ...checksumHashCommands({
          variable: "CREDS_HASH",
          read: `sops -d ${ci.workspace}/infra/k8s/src/cloudflared/cloudflared.k8s-secret.sops.yaml`,
          subject: "cloudflared.k8s-secret.sops.yaml",
        }),
        `sed "s|checksum/config:.*|checksum/config: \\"$\{CONFIG_HASH}\\"|" ${ci.workspace}/infra/k8s/src/cloudflared/generated/deployment.generated.yaml \\`,
        `  | sed "s|checksum/creds:.*|checksum/creds: \\"$\{CREDS_HASH}\\"|" \\`,
        "  | kubectl apply -n cloudflared -f -",
      ],
      dependsOn: ["cloudflared-generate-and-apply-config"],
      backendOptions: {
        kubernetes: {
          serviceAccountName: "pipeline-engine",
          resources: { limits: { memory: "4Gi" } },
        },
      },
    }),
    step({
      name: "cloudflared-sync-dns",
      image: IMAGES.CI,
      shell: ["/ci-storage/tools/bash", "-c"],
      environment: {
        HOME: "/tmp",
        HUSKY: "0",
        CLOUDFLARE_API_TOKEN: secret(SECRETS.CLOUDFLARE_API_TOKEN),
      },
      commands: (ci) => [
        "set -e",
        `LIVE_HASH=$(kubectl get configmap cloudflared-config -n cloudflared -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || true)`,
        `if [ "$LIVE_HASH" = "${ci.inputsHash}" ]; then echo "[skip] Content hash ${ci.inputsHash} matches — DNS already synced"; exit 0; fi`,

        `bun ${ci.workspace}/infra/scripts/src/generate-tunnel-config.ts > /tmp/cloudflared-configmap.yaml`,
        `_DEPLOY_LIB_DIR=${ci.workspace}/infra/lib`,
        `. ${ci.workspace}/infra/lib/deploy-functions.sh`,
        "mkdir -p /tmp/.cloudflare",
        'echo "${CLOUDFLARE_API_TOKEN}" > /tmp/.cloudflare/api-token',
        "TUNNEL_ID=$(grep '^[[:space:]]*tunnel:' /tmp/cloudflared-configmap.yaml | awk '{print $2}')",
        'sync_tunnel_dns /tmp/cloudflared-configmap.yaml "${TUNNEL_ID}"',
      ],
      dependsOn: ["cloudflared-generate-and-apply-config"],
      backendOptions: {
        kubernetes: {
          serviceAccountName: "pipeline-engine",
          resources: { limits: { memory: "4Gi" } },
        },
      },
    }),
    step({
      name: "cloudflared-sync-a-records",
      image: IMAGES.CI,
      shell: ["/ci-storage/tools/bash", "-c"],
      environment: {
        HOME: "/tmp",
        CLOUDFLARE_API_TOKEN: secret(SECRETS.CLOUDFLARE_API_TOKEN),
      },
      commands: (ci) => [
        "set -e",
        `LIVE_HASH=$(kubectl get configmap cloudflared-config -n cloudflared -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || true)`,
        `if [ "$LIVE_HASH" = "${ci.inputsHash}" ]; then echo "[skip] Content hash ${ci.inputsHash} matches — A records already synced"; exit 0; fi`,
        `_DEPLOY_LIB_DIR=${ci.workspace}/infra/lib`,
        `. ${ci.workspace}/infra/lib/deploy-functions.sh`,
        "mkdir -p /tmp/.cloudflare",
        'echo "${CLOUDFLARE_API_TOKEN}" > /tmp/.cloudflare/api-token',
        `jq -r '.[] | select(.hostname) | "\\(.hostname) \\(.host)"' ${ci.workspace}/infra/scripts/bootstrap/nodes.json | while IFS=" " read -r h ip; do add_dns_a_record "$h" "$ip"; done`,
      ],
      dependsOn: ["cloudflared-generate-and-apply-config"],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
    step({
      name: "cloudflared-stamp-content-hash",
      image: IMAGES.KUBECTL,

      environment: { HOME: "/tmp" },
      commands: (ci) => [
        `kubectl annotate configmap cloudflared-config -n cloudflared pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
      ],
      dependsOn: [
        "cloudflared-sync-dns",
        "cloudflared-sync-a-records",
        "cloudflared-apply-deployment",
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})
