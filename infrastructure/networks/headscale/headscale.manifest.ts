import type { Manifest } from "@akasha/k8s-types/manifest"

export const headscale = {
  id: "01a0738c-9157-7c4c-906c-8ff65da0976d",
  pageTypeSlug: "manifest",
  slug: "headscale",
  definition:
    "the workload, service and policies running the server that admits machines to the private network",
  parts: ["module/headscale-configmaps", "module/headscale-network-policies"],
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
