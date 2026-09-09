import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const smilingjennyWebManifests = {
  id: "01a0738a-19b1-7fe7-872a-08b04bd574dd",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "smilingjenny-web-manifests",
  definition: "the deployment and service running Jenny's command center",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
