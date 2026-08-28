import { IMAGES } from "../../tools/lib/workflow-dsl/images"
import { step } from "../../tools/lib/workflow-dsl/step"
import { applyRbac } from "../../tools/lib/workflow-dsl/templates/rbac-apply"
import { sopsDecryptApply } from "../../tools/lib/workflow-dsl/templates/sops-decrypt"
import { workflow } from "../../tools/lib/workflow-dsl/workflow"

export const workflows = [
  workflow("collections", {
    kind: "foundation",
    dependsOn: ["ci-images", "preparation", "seaweedfs", "app-namespaces"],
    when: { branch: "main", event: "push" },
    steps: [
      applyRbac({
        name: "collections-apply-rbac",
        rbacFile: "tools/lib/rbac/collections.ts",
      }),
      sopsDecryptApply({
        name: "collections-infra-apply-secrets",
        namespace: "collections",
        secretFile: "infra/k8s/src/collections/secrets.sops.yaml",
      }),
      {
        ...step({
          name: "collections-mirror-s3-creds",
          image: IMAGES.CI,
          environment: { HOME: "/tmp" },
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
