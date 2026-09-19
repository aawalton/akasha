import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const alanwaltonWeb = {
  id: "01a0737e-5eae-7286-97df-40905333f97f",
  type: "page-type/manifest",
  slug: "alanwalton-web",
  definition: "the deployment and service running Alan's command center",
  code: "ts",
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the alanwalton-s3-creds secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The keys hashed from the alanwalton-s3-creds secret are access_key and secret_key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the alanwalton-secrets secret.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every key that secret carries is hashed, the pod reading them all.",
    },
  ],
} as const satisfies Manifest
