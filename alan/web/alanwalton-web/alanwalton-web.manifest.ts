import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const alanwaltonWeb = {
  id: "01a0737e-5eae-7286-97df-40905333f97f",
  type: "manifest",
  slug: "alanwalton-web",
  definition: "the deployment and service running Alan's command center",
  code: "ts",
  generatedDirectory: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod template carries the hash of the alanwalton-s3-creds secret.",
    },
    {
      invariantKind: "departure",
      statement:
        "The keys hashed from the alanwalton-s3-creds secret are access_key and secret_key.",
    },
  ],
} as const satisfies Manifest
