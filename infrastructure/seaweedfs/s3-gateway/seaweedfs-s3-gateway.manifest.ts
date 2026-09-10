import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const seaweedfsS3Gateway = {
  id: "01a0737e-4ab7-770b-9a76-2fa23955be63",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "seaweedfs-s3-gateway",
  definition: "the deployment serving the stored files over the S3 interface, and the way in to it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
