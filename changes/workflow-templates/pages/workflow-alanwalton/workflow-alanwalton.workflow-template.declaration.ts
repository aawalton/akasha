import { IMAGES } from "@akasha/workflow-language/images"
import { kubectlApply } from "@akasha/workflow-language/kubectl-apply"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

export const workflows = [
  workflow("alanwalton", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation", "seaweedfs"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({
        name: "alanwalton-apply-rbac",
        rbacFile:
          "infrastructure/cluster-manifests/alanwalton-web-rbac/alanwalton-web-rbac.module.code.ts",
      }),
      kubectlApply({
        name: "alanwalton-infra-apply-service",
        namespace: "alanwalton",
        files: "alan/web/generated/web-service.generated.yaml",
        serverSide: true,
      }),
      sopsDecryptApply({
        name: "alanwalton-infra-apply-secrets",
        namespace: "alanwalton",
        secretFile: "alan/web/deploy/secrets.sops.yaml",
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
