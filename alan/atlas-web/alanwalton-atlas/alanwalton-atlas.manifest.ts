import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const alanwaltonAtlas = {
  id: "01a07382-cc82-70f9-994d-20709df7bec4",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "alanwalton-atlas",
  definition: "the deployment and service drawing Alan's map and taking in his phone's locations",
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
