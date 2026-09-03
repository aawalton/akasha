import type { Module } from "@akasha/code-system/module"

export const seaweedfsDeployments = {
  id: "01a06816-68b0-7032-92cb-02e742a97bc7",
  pageTypeSlug: "module",
  slug: "seaweedfs-deployments",
  definition: "the deployment manifests for the master, the volume, the filer and the S3 gateway",
  code: "ts",
} as const satisfies Module
