import { checksumHashCommands } from "@akasha/workflow-language/checksum-hash"
import { IMAGES } from "@akasha/workflow-language/images"
import { kubectlApplyClusterScoped } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { secretPlaceApply } from "@akasha/workflow-language/secret-place"
import { SECRETS, secret } from "@akasha/workflow-language/secrets"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

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
      rbacFile: "infrastructure/cluster-manifests/cloudflared-rbac/cloudflared-rbac.module.code.ts",
    }),
    secretPlaceApply({
      name: "cloudflared-apply-secret",
      namespace: "cloudflared",
      resource: "cloudflared-creds",
      labels: {
        "app.kubernetes.io/name": "cloudflared",
        "app.kubernetes.io/instance": "infra",
        "app.kubernetes.io/component": "tunnel",
        "app.kubernetes.io/part-of": "infra",
        "app.kubernetes.io/managed-by": "deploy-script",
      },
    }),
    step({
      name: "cloudflared-generate-and-apply-config",
      image: IMAGES.CI,
      environment: { HOME: "/tmp", HUSKY: "0" },
      commands: (ci) => [
        "set -e",
        `LIVE_HASH=$(kubectl get configmap cloudflared-config -n cloudflared -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || true)`,
        `if [ "$LIVE_HASH" = "${ci.inputsHash}" ]; then echo "[skip] Content hash ${ci.inputsHash} matches live configmap — skipping"; exit 0; fi`,
        `bun ${ci.workspace}/infrastructure/cluster-manifests/tunnel-config/tunnel-config.module.code.ts > /tmp/cloudflared-configmap.yaml`,
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
          read: `bun ${ci.workspace}/service-system/secrets/secret-saying/secret-saying.module.code.ts --root ${ci.workspace} --resource cloudflared-creds --namespace cloudflared`,
          subject: "cloudflared-creds",
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

        `bun ${ci.workspace}/infrastructure/cluster-manifests/tunnel-config/tunnel-config.module.code.ts > /tmp/cloudflared-configmap.yaml`,
        `_DEPLOY_LIB_DIR=${ci.workspace}/infrastructure/cluster-operations/deploy-functions`,
        `. ${ci.workspace}/infrastructure/cluster-operations/deploy-functions/deploy-functions.shell-script.shell.sh`,
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
      name: "cloudflared-stamp-content-hash",
      image: IMAGES.KUBECTL,

      environment: { HOME: "/tmp" },
      commands: (ci) => [
        `kubectl annotate configmap cloudflared-config -n cloudflared pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
      ],
      dependsOn: ["cloudflared-sync-dns", "cloudflared-apply-deployment"],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
  ],
})
