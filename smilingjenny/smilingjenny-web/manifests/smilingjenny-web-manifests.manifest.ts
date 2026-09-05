import type { Manifest } from "@akasha/k8s-types/manifest"

export const smilingjennyWebManifests = {
  id: "01a0738a-19b1-7fe7-872a-08b04bd574dd",
  pageTypeSlug: "manifest",
  slug: "smilingjenny-web-manifests",
  definition: "the deployment and service running Jenny's command center",
  code: "ts",
} as const satisfies Manifest
