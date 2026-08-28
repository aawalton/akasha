import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { kubectlApply } from "../../tools/lib/workflow-dsl/templates/kubectl-apply"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export const workflows = [
  workflow("alanwalton", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation", "seaweedfs"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({ name: "alanwalton-apply-rbac", rbacFile: "tools/lib/rbac/alanwalton-web.ts" }),
      kubectlApply({
        name: "alanwalton-infra-apply-service",
        namespace: "alanwalton",
        files: "alanwalton/web/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "alanwalton-infra-apply-secrets",
        namespace: "alanwalton",
        secretFile: "alanwalton/web/deploy/secrets.sops.yaml",
      }),
      step({
        name: "alanwalton-mirror-s3-creds",
        image: IMAGES.CI,
        environment: { HOME: "/tmp" },
        commands: [
          "set -e",
          "kubectl get secret seaweedfs-creds -n seaweedfs -o json | " +
            'jq \'{apiVersion:"v1",kind:"Secret",type:"Opaque",' +
            'metadata:{name:"alanwalton-s3-creds",namespace:"alanwalton"},' +
            "data:{access_key:.data.access_key,secret_key:.data.secret_key}}' | " +
            "kubectl apply -f -",
        ],
        backendOptions: {
          kubernetes: { serviceAccountName: "pipeline-engine" },
        },
      }),
    ],
  }),
]
