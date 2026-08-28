import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

const SKIP_CHECK = [
  "CURRENT_HASH=$(kubectl get configmap cloudnative-pg-pipeline-state -n cnpg-system -o jsonpath='{.metadata.annotations.pipeline\\.alanwalton\\.com/content-hash}' 2>/dev/null || echo \"\")",
  'if [ "$CURRENT_HASH" = "$CONTENT_HASH" ]; then echo "Content hash unchanged, skipping"; exit 0; fi',
]

export default workflow("cloudnative-pg", {
  kind: "foundation",
  dependsOn: ["preparation"],
  when: { branch: "main", event: "push" },
  steps: [
    step({
      name: "cloudnative-pg-apply-namespace",
      image: IMAGES.KUBECTL,
      environment: { HOME: "/tmp" },
      commands: (ci) => [
        "set -e",
        `CONTENT_HASH="${ci.inputsHash}"`,
        ...SKIP_CHECK,
        `kubectl apply --server-side --force-conflicts -f ${ci.workspace}/infra/k8s/src/cloudnative-pg/generated/namespace.generated.yaml`,
      ],
      backendOptions: {
        kubernetes: { serviceAccountName: "pipeline-engine" },
      },
    }),
    {
      ...applyRbac({
        name: "cloudnative-pg-apply-rbac",
        rbacFile: "tools/lib/rbac/cloudnative-pg.ts",
      }),
      dependsOn: ["cloudnative-pg-apply-namespace"],
    },
    {
      ...step({
        name: "cloudnative-pg-stamp-content-hash",
        image: IMAGES.KUBECTL,
        environment: { HOME: "/tmp" },
        commands: (ci) => [
          "set -e",
          "kubectl create configmap cloudnative-pg-pipeline-state -n cnpg-system --dry-run=client -o yaml | kubectl apply -f -",
          `kubectl annotate configmap cloudnative-pg-pipeline-state -n cnpg-system pipeline.alanwalton.com/content-hash=${ci.inputsHash} --overwrite`,
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
      dependsOn: ["cloudnative-pg-apply-rbac"],
    },
  ],
})
