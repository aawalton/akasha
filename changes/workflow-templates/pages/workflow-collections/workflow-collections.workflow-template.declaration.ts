import { IMAGES } from "@akasha/workflow-language/images"
import { applyRbac } from "@akasha/workflow-language/rbac-apply"
import { sopsDecryptApply } from "@akasha/workflow-language/sops-decrypt"
import { step } from "@akasha/workflow-language/step"
import { workflow } from "@akasha/workflow-language/workflow"

export const workflows = [
  workflow("collections", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation", "seaweedfs", "app-namespaces"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({
        name: "collections-apply-rbac",
        rbacFile:
          "infrastructure/cluster-manifests/collections-rbac/collections-rbac.module.code.ts",
      }),
      sopsDecryptApply({
        name: "collections-infra-apply-secrets",
        namespace: "collections",
        secretFile:
          "infrastructure/cluster-manifests/cluster-secrets/collections.k8s-secret.sops.yaml",
      }),
      {
        ...step({
          name: "collections-mirror-s3-creds",
          image: IMAGES.CI,
          environment: { HOME: "/var/tmp" },
          commands: [
            "set -e",
            "kubectl get secret seaweedfs-creds -n seaweedfs -o json | " +
              'jq \'{apiVersion:"v1",kind:"Secret",type:"Opaque",' +
              'metadata:{name:"collections-s3-creds",namespace:"collections"},' +
              "data:{SEAWEEDFS_ACCESS_KEY:.data.access_key,SEAWEEDFS_SECRET_KEY:.data.secret_key}}' | " +
              "kubectl apply -f -",
          ],
          backendOptions: {
            kubernetes: { serviceAccountName: "pipeline-engine" },
          },
        }),
        dependsOn: ["collections-apply-rbac"],
      },
    ],
  }),
]
